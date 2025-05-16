#!/bin/bash

echo "🚀 Starting setup for back-node-java-A"

# === Check prerequisites ===

# --- Node.js ---
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed."

  read -p "👉 Install Node.js using apt? [y/N] " install_node
  if [[ "$install_node" =~ ^[Yy]$ ]]; then
    curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
    sudo apt install -y nodejs
  else
    echo "⛔ Node.js is required. Please install it manually: https://nodejs.org/"
    exit 1
  fi
else
  echo "✅ Node.js is already installed: $(node -v)"
fi

# --- Yarn ---
if ! command -v yarn &> /dev/null; then
  echo "❌ Yarn is not installed."

  read -p "👉 Install Yarn with npm? [y/N] " install_yarn
  if [[ "$install_yarn" =~ ^[Yy]$ ]]; then
    npm install -g yarn
  else
    echo "⛔ Yarn is required. Please install it manually: https://yarnpkg.com/"
    exit 1
  fi
else
  echo "✅ Yarn is already installed: $(yarn -v)"
fi

# === MySQL Check ===

MYSQL_CONTAINER_NAME="javaa-mysql"
MYSQL_ROOT_PASSWORD="root"
MYSQL_DATABASE="javaA"

function import_sql {
  echo "📥 Importing database..."

  sudo mysql -u "$1" -p"$2" -e "CREATE DATABASE IF NOT EXISTS $MYSQL_DATABASE CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
  sudo mysql -u "$1" -p"$2" $MYSQL_DATABASE < ./sql/script.sql

  if [ $? -ne 0 ]; then
    echo "❌ Failed to import database."
    exit 1
  fi

  echo "✅ Database '$MYSQL_DATABASE' is ready."
}

# Check local MySQL server
MYSQL_RUNNING_LOCAL=false
if command -v mysql &> /dev/null; then
  mysqladmin ping -u root &> /dev/null && MYSQL_RUNNING_LOCAL=true
fi

# Check Docker MySQL image presence
MYSQL_IMAGE=$(docker images | grep mysql | awk '{print $1":"$2}' | head -n 1)

if [ -n "$MYSQL_IMAGE" ]; then
  echo "🐳 Found MySQL Docker image: $MYSQL_IMAGE"
elif [ "$MYSQL_RUNNING_LOCAL" = true ]; then
  echo "🖥️ Local MySQL server is running."
else
  echo "❌ No MySQL found on this machine (neither Docker image nor local MySQL server)."
  echo "👉 Please install MySQL (Docker or native server), then re-run this script."
  exit 1
fi

# === Install dependencies ===
echo "📦 Installing dependencies with Yarn..."
yarn install

if [ $? -ne 0 ]; then
  echo "❌ Dependency installation failed."
  exit 1
fi

# === Done ===
echo "🎉 Setup complete! You can now run:"
echo ""
echo "  yarn start"
echo "or:"
echo "  yarn dev"
