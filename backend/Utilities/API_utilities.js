const posts_db_name = process.env.NODE_ENV
    ? 'disasters'
    : 'test_disasters';

export {
    posts_db_name,
}