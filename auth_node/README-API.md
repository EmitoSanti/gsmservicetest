<a name="top"></a>
# Auth Service v0.1.0

Microservicio de Autentificación

- [RabbitMQ_POST](#rabbitmq_post)
	- [Invalidar Token Cambiar a direct](#invalidar-token-cambiar-a-direct)
	


# <a name='rabbitmq_post'></a> RabbitMQ_POST

## <a name='invalidar-token-cambiar-a-direct'></a> Invalidar Token Cambiar a direct
[Back to top](#top)

<p>AuthService enviá un broadcast a todos los usuarios cuando se logean.</p>

	FANOUT auth/fanout




### Success Response

Mensaje

```
{
   "type": "login",
   "message": "{id logueado}"
   "time": "{time}"
}
```


