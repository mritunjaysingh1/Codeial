

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'blahsomething',
    db: 'codeial_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'mritunjaychauhan143@gmail.com',
            pass: '***********'
        }
    },
    google_client_id: "479480915663-mo88vf91d7sk2j7i4mn9ff5hpsan4b0a.apps.googleusercontent.com",
    google_client_secret: "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",
    google_call_back_url: "http://localhost:8000/users/auth/google/callback",
    jwt_secret: 'codeial',
}


const production =  {
    name: 'production'
}



module.exports = development;