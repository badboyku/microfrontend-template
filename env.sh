#!/usr/bin/env bash

is_dev() {
  if [[ $(pwd) == "/usr/share/nginx/html" ]]; then
    return 1
  fi
  return 0
}

if is_dev; then
  echo "Starting process to create env_config_js file for runtime."
fi

# Set env_config_js path
if is_dev; then
  env_config_js="./public/env-config.js"
else
  env_config_js="/usr/share/nginx/html/env-config.js"
fi

# Remove old env_config_js file
if is_dev; then
  echo "Removing old env_config_js file."
fi
rm -rf "$env_config_js"

# Set env_file path
if [ -f ".env" ]; then
  if is_dev; then
    echo "Found .env file."
  fi
  env_file=".env"
else
  if is_dev; then
    echo "WARNING: The .env file not found."
  fi
fi

# Look for env vars to add
if is_dev; then
  echo "Locating other env vars to add."
fi
if [ -n "$env_file" ]; then
  env_file_config=$(grep -E '^(REACT_APP_)' $env_file)
fi
env_config=$(printenv | grep -E '^(REACT_APP_)')
all_env_config=$(echo -e "$env_file_config\n$env_config" | sed '/^$/d')

if [ -n "$all_env_config" ]; then
  if is_dev; then
    echo "We have env vars."
  fi

  # Create new env_config_js file
  if is_dev; then
    echo "Creating new env_config_js file."
  fi
  touch "$env_config_js"

  # Add env vars to env_config_js file
  if is_dev; then
    echo "Adding env vars to env_config_js file."
  fi
  echo "window._env_ = {" >> "$env_config_js"

  # Read each line in .env file. Each line represents key=value pairs
  while read -r line || [[ -n "$line" ]];
  do
    # Split env variables by character '='
    if printf '%s\n' "$line" | grep -q -e '='; then
      varname=$(printf '%s\n' "$line" | sed -e 's/=.*//')
      varvalue=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
    fi

    # Read value of current variable if exists as env variable
    value=$(printf '%s\n' "${!varname}")
    # Otherwise use value from .env file
    [[ -z $value ]] && value=${varvalue}

    # Append configuration property to env_config_js file
    if grep "$varname" $env_config_js > /dev/null; then
      sed -E -i "s|$varname: \"(.*)\"|$varname: '$value'|g" "$env_config_js"
    else
      echo "  $varname: '$value'," >> "$env_config_js"
    fi
  done <<< "$all_env_config"
  echo "};" >> "$env_config_js"

  if is_dev; then
    echo "Saved env_config_js file."
  fi
else
  if is_dev; then
    echo "No env vars found, skip creating env_config_js file."
  fi
fi
