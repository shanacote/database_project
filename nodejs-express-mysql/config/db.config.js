//https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server
//This was needed: ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
module.exports = {
    HOST: "127.0.0.1",
    USER: "root",
    PASSWORD: "password",
    DB: "db_project",
    dialect: "mysql"
};