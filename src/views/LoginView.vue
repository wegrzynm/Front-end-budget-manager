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
                const headers = { "Content-Type": "application/json", 'Authorization': token };
                const user = await fetch('api/users/me', { headers })
                if(user.status == 200) {
                    const userId = await user.json()
                    localStorage.setItem('user', `api/users/${userId.id}`)
                    localStorage.setItem('currency', userId.currency)
                    localStorage.setItem('logged', true)
                    this.$router.push('/')
                }else {
                    alert('Error')
                }
            }else {
                alert('Error')
            }
        }
    },
    emits: ['logged']
}
</script>

<style scoped>
.template {
    border: none
}
</style>