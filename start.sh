#!/bin/bash
bundle install
bundle exec rackup --host 0.0.0.0 --port $PORT