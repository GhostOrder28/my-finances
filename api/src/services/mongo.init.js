db.createUser({
    user: 'ghost',
    pwd: 'testing',
    roles: [
        {
            role: 'readWrite',
            db: 'mongo',
        },
    ],
});

db = new Mongo().getDB("mongo");

db.createCollection('users', { capped: false });
db.createCollection('sales', { capped: false });
