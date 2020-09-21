#!/usr/bin/env ruby

require 'net/http'
require 'json'
require 'date'
require 'csv'

uri = "https://status.gamer4life.net/status.php"
result = JSON.parse(Net::HTTP.get(URI.parse(uri)))

CSV.open("stats.csv", "a+") do |csv|
		csv << [Time.now, result["status"]]
end