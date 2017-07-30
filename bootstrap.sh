#!/bin/bash
echo "Installing jinja2"
pip install jinja2-cli

echo "Exploding templates"
jinja2 package.json.tmpl -D slidename=$1 > package.json
jinja2 public/content.md.tmpl -D title="$2" > public/content.md
jinja2 public/index.html.tmpl -D title="$2" > public/index.html

echo "Installing dependencies"
npm install
