# blog


## prisma

```bash
// 数据库调整后需要执行
npx prisma migrate dev --name init

npx prisma generate

```


默认账号即仅有密码的账户, 该账号不能删除, 连接密码为设置的实例密码;
自定义账号连接Redis密码格式: 账号名@密码, 作为连接密码参数;
自定义账号连接示例: redis-cli -h 1.1.1.1 -p 6379 -a readonlyuser@password

redis://rwuser:Zhayu2103@172.16.0.13:6379/crs-fdu9xytz