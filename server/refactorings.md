# Refactoring in `server` package

1. Adding Mongoose as an Object Data Modeling library and schema-based approach for controlling application data. **Rationale**: safer CRUD operations and more legible code, better business logic rules enforcement, self-explanatory code.

2. Restructure a straightforward Express application into an MVC architecture. **Rationale:** better prepared for scaling and modifiability, implementing a layered approach that is more understandable for developers.

3. Refactor secure-routes preliminary check into a single, reusable middleware function `secureRoute`. This function can be inserted in any other route that needs permissions by modifying the route declaration only and without touching the inner code of the code of the handler function. **Rationale**: SOLID principles, separation of concerns, reusability, modularity.
