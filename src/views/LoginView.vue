<template>
<div class="template">
    <h1>Login</h1>
    <form @submit="onSubmit" method="POST">
        <div class="form-control">
        <label>Email</label>
        <input v-model="email" type="email" name="username" autocomplete="username"/>
        </div>
        <div class="form-control">
        <label>Password</label>
        <input v-model="password" type="password" name="password" autocomplete="current-password"/>
        </div>
        <input type="submit" value="Login" class="btn btn-block" />
    </form>
</div>
</template>

<script>
export default {
    name: 'App-Login',
    data () {
        return {
            email: 'matzyn.yt@gmail.com',
            password: 'admin123'
        }
    },
    methods: {
        async onSubmit(e) {
            e.preventDefault()
            const login = {
                "email": this.email,
                "password": this.password
            }

            const res = await fetch('https://127.0.0.1:8000/authentication_token', {
            method: 'POST',
            headers: {
            'Content-type': 'application/json'
            },
            body: JSON.stringify(login)
            })
            if(res.status == 200) {
                const data = await res.json()
                const token = `Bearer ${data.token}`
                localStorage.setItem('token', token)
                // const headers = {
                // 'Content-type': 'application/json',
                // 'Authentication': `Bearer ${data.token}`,
                // 'Access-Control-Allow-Origin': '*'
                // }
                const headers = { "Content-Type": "application/json", 'Authorization': token };
                const user = await fetch('api/users/me', { headers })
                if(user.status == 200) {
                    const userId = await user.json()
                    localStorage.setItem('user', `api/users/${userId}`)
                    this.$router.push('/') 
                }else {
                    alert('Error')
                }
            }else {
                alert('Error')
            }
            
        }
    }
}
</script>

<style scoped>
.template {
    background-color: #f2f2f2;
    width: 80%;
    margin: auto;
    padding-top: 10px;
    border-radius: 10px;
    border: 2px solid #2c3e50;
    overflow: hidden;
    height: 500px;
}
</style>