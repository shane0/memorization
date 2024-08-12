#!/usr/bin/env bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:shane0/memorization.git
git push -u origin main