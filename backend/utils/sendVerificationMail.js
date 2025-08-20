const  { emailTransporter }  = require("./createMailTransport");


const sendVerificationEmail = async (user) =>{
    const transporter =emailTransporter()
    // const verificationUrl = `http://localhost:5000/api/verify-email/${token}`;
    let  verificationUrl = `https://mm-traders-app-frontend.vercel.app/verify-email/?emailToken=${user.emailToken}`;
    // console.log(verificationUrl, 'verificationUrl')
    //         console.log(verificationUrl,'verificationUrl')
            const mailOptions = {
                from: 'faranimp@gmail.com',
                to: user.email,
                subject: 'Verify Your Email',
                // html: `Please click the following link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`
                html: `Please click the following link to verify your email: <a href="${verificationUrl}">${verificationUrl}</a>`

            };
            transporter.sendMail(mailOptions,function(error, info){ 
                if (error) console.log(error,'errr'); 
                // console.log('Email Sent Successfully',info); 
                console.log(info); 
            });
            // return new Promise ((resolve,reject)=>{
            //     transporter.sendMail(mailOptions,function(error, info){ 
            //         if (error) return reject(error); 
            //         // console.log(info,'info'); 
            //         return resolve('Email Verification Link sent Successfully please check your emai')
            //         // console.log('Email Sent Successfully',info); 
            //         // console.log(info); 
            //     });
            // })
            // res.send({success:true,message:'Registration successful, please verify your email.'})
            // res.send('Registration successful, please verify your email.')
}
module.exports = {sendVerificationEmail}