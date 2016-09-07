#!/bin/bash

mkdir -p scratch

#
# Clear out the old database if it exists
#

rm -rf scratch/assessdb.sqlite

#
# initialize the new database
#

initialize_assessdb_db development.ini

import_csv_courses development.ini assessdb/test_data/courses.csv 
import_csv_instruments development.ini assessdb/test_data/instruments.csv 
import_csv_items development.ini assessdb/test_data/items.csv 
import_csv_people development.ini assessdb/test_data/students.csv 

