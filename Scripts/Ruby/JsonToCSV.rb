#!/usr/bin/env ruby

require 'net/http'
require 'json'
require 'date'
require 'csv'

uri = "https://status.gamer4life.net/status.php"
result = JSON.parse(Net::HTTP.get(URI.parse(uri)))
time = Time.now
timestamp = time.month.to_s + ":" + time.day.to_s << ":" + time.hour.to_s

CSV.open("stats.csv", "a+") do |csv|
		csv << [timestamp, result["status"]]
end