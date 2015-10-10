# `tournaments`

| PRIMARY KEY id | active    | name |
| -------------- | --------- | ---- |
| INT() NOT NULL | BOOLEAN() |      |

# `match`

| PRIMARY KEY id | tournament REFERENCES tournaments(id) | match_number | active    | red_1 REFERENCES teams(id) | red_2 REFERENCES teams(id) | blue_1 REFERENCES teams(id) | blue_2 REFERENCES teams(id) | red_1_points | red_2_points | blue_1_points | blue_2_points | red_1_penalties | red_2_penalties | blue_1_penalties | blue_2_penalties | winner |
| -------------- | ------------------------------------- | ------------ | --------- | -------------------------- | -------------------------- | --------------------------- | --------------------------- | ------------ | ------------ | ------------- | ------------- | --------------- | --------------- | ---------------- | ---------------- | ------ |
| INT() NOT NULL |                                       | INT()        | BOOLEAN() |                            |                            |                             |                             | INT()        | INT()        | INT()         | INT()         | INT()           | INT()           | INT()            | INT()            | ENUM() |

# `teams`

| PRIMARY KEY id | tournament REFERENCES tournaments(id) |
| -------------- | ------------------------------------- |
| INT() NOT NULL |                                       |

# `people`

| PRIMARY KEY id | first       | last        | gender | team REFERENCES teams(id) | type   |
| -------------- | ----------- | ----------- | ------ | ------------------------- | ------ |
| INT() NOT NULL | VARCHAR(20) | VARCHAR(20) | ENUM() |                           | ENUM() |
