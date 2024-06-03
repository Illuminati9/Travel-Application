### User
- #### Search
    - /search/getBusDetails
    - /search/getStops
- #### Ticket
    - /ticket/createTicket

### Bus



### Owner

- /owner/createOwner - PUT
- /owner/createBus
- /owner/editBus
- /owner/createSeat
- /owner/editSeat/:id
- /owner/deleteSeat/:id

### Admin

- #### Stop
    - Get
        - /admin/stops
        - /admin/stop - By Name using query
        - /admin/stop/:id
    - Post
        - /admin/stop - Create Stop
    - Edit 
        - /admin/stop/:id
    - Delete
        - /admin/stop/:id

- #### Ticket
    - /admin/getTicket