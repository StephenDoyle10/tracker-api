/* what this script is for: if you run this script,
then the database entries are reset.
It can be run from terminal by going to project core directory and running:
mongo issuetracker api/scripts/init.mongo.js */


/* global db print */
/* eslint no-restricted-globals: "off" */

db.issues.remove({});
db.deleted_issues.remove({});


const issuesDB = [
  {
    id: 1,
    status: 'New',
    owner: 'Ravan',
    effort: 5,
    created: new Date('2019-01-15'),
    due: undefined,
    title: 'Error in console when clicking Add',
    description: 'Steps to recreate the problem:'
      + '\n1. Refresh the browser.'
      + '\n2. Select "New" in the filter'
      + '\n3. Refresh the browser again. Note the warning in the console:'
      + '\n   Warning: Hash history cannot PUSH the same path; a new entry'
      + '\n   will not be added to the history stack'
      + '\n4. Click on Add.'
      + '\n5. There is an error in console, and add doesn\'t work.',
  },
  {
    id: 2,
    status: 'Assigned',
    owner: 'Eddie',
    effort: 14,
    created: new Date('2019-01-16'),
    due: new Date('2019-02-01'),
    title: 'Missing bottom border on panel',
    description: 'There needs to be a border in the bottom in the panel'
      + ' that appears when clicking on Add',
  },
];

db.issues.insertMany(issuesDB);
const count = db.issues.count();
print('Inserted', count, 'issues');

db.counters.remove({ _id: 'issues' });
db.counters.insert({ _id: 'issues', current: count });

db.issues.createIndex({ id: 1 }, { unique: true });
db.issues.createIndex({ status: 1 });
db.issues.createIndex({ owner: 1 });
db.issues.createIndex({ created: 1 });
db.issues.createIndex({ title: 'text', description: 'text' });

db.deleted_issues.createIndex({ id:1 }, { unique: true })

/*
To run this script (which will refresh all data and get rid of changes):
In terminal type - mongo IssueTracker scripts/initMongo.js

Recap on using mongo shell: 
1. In command line type mongo and click 'enter'. You are now in mongo shell.
2. type 'show dbs' to see all mongo databases on your device. If you have run this script you should see a database called IssueTracker.
3. type 'use IssueTracker' to move into that database.
4. type 'show collections' to see collections in the database. After running this script, you should see one collection, called 'issues'.
5. To check all the the objects contained in this collection type 'db.issues.find().pretty(). (the .pretty() suffix is optional...as the name suggests it just makes the output more palatable.)
*/