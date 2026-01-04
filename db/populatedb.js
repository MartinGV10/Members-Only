#! /usr/bin/env node

const { Client } = require('pg')

const SQL = `
INSERT INTO users (
  first_name,
  last_name,
  username,
  password_hash,
  is_member,
  is_admin
) VALUES
-- Regular non-member
(
  'Alice',
  'Wonders',
  'alice@example.com',
  '$2a$10$abcdefghijklmnopqrstuvABCDEFGHIJKLMNO1234567890',
  FALSE,
  FALSE
),

-- Club member
(
  'Bob',
  'Builder',
  'bob@example.com',
  '$2a$10$qrstuvwxyzABCDEFGHIJKLMNOabcdefghijklmnop123456',
  TRUE,
  FALSE
),

-- Admin (also a member)
(
  'Charlie',
  'Boss',
  'charlie@example.com',
  '$2a$10$ABCDEFGHIJKLMNOqrstuvwxyzabcdefghijklmnop123456',
  TRUE,
  TRUE
);


INSERT INTO messages (
  user_id,
  title,
  body
) VALUES
(
  2,
  'First Rule of Club',
  'The first rule of the club is you do not talk about the club.'
),
(
  2,
  'Late Night Thoughts',
  'Sometimes coding at 2am feels productive until you see the bugs.'
),
(
  3,
  'Admin Announcement',
  'Please remember to keep posts respectful. Abuse will be removed.'
);

`

async function main() {
    console.log('seeding...')
    const client = new Client({
        connectionString: 'postgresql://postgres:tinyteo158@localhost:5432/members_only'
    })
    await client.connect()
    await client.query(SQL)
    await client.end()
    console.log('done')
}

main()