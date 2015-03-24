import csv
import json

csvfile = open('lvl_docs.csv', 'r')
jsonfile = open('docs.json', 'w')

fieldnames = ("npi", "full_name", "first_name", "middle_name", "last_name", "title", "street_address_1", "street_address_2", "street_city", "street_state", "street_zip", "street_county", "street_phone", "email", "gender", "specialty", "specialty_2", "license_number", "license_state")
reader = csv.DictReader( csvfile, fieldnames)
for row in reader:
    json.dump(row, jsonfile)
    jsonfile.write(',\n')