# ripe-banana-kat

Actor:
- GET
    return: [{ id, name }]
- GET by id
    return: {
    name,
    dob,
    pob,
    films: [{
      id,
      title,
      released
    }]
}
- POST

Studios:
- GET
    return: [{ id, name }]
- GET by id
    return: { id, name, city, state, country, films: [{ id, title }] }
- POST

Reviewer
- GET
    return: [{
  id,
  name,
  company
}]
- GET by id
    return: {
    id,
    name,
    company,
    reviews: [{
        id,
        rating,
        review,
        film: { id, title }
    }]
}
- POST
- PUT
- DELETE

Review
- GET
limit 100 reviews: [{
    id,
    rating,
    review,
    film: { id, title }
}]
- POST
- DELETE

Films
- GET
    return: [{
    id, title, released,
    studio: { id, name }
}]
- GET by id
    return: {
    title,
    released,
    studio: { id, name },
    cast: [{
        id,
        role,
        actor: { id, name }
    }],
    reviews: [{
        id,
        rating,
        review,
        reviewer: { id, name }
    ]
}
<img width="986" alt="Screen Shot 2021-04-09 at 2 08 26 PM" src="https://user-images.githubusercontent.com/74579728/114241126-8b0ef480-993d-11eb-85ac-ec8532f0b879.png">
