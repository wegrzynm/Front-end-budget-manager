<template>
<div class="template">
    <h1>Login</h1>
    <semipolar-spinner
            v-if="isLoading"
            class="loader"
            :animation-duration="2000"
            :size="300"
            color="#4CAF50"
            />
    <form @submit="onSubmit" method="POST" v-if="!isLoading">
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
            password: 'admin123',
            isLoading: false
        }
    },
    methods: {
        async onSubmit(e) {
            e.preventDefault()
            this.isLoading = true
            const login = {
                "email": this.email,
                "password": this.password
            }
            const res = await fetch('https://127.0.0.1:8000/authentication_token', {
            method: 'POST',
            headers: {
            'Content-type': 'application/json',
            'Accept': '*/*'
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
                    localStorage.setItem('created', Date.now()/1000)
                    this.$router.push('/')
                    this.isLoading = false
                }else {
                    this.isLoading = false
                    alert('Error')
                }
            }else {
                this.isLoading = false
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