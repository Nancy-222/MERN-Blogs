const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');


//Send an email
const sendSupportMail = async (req, res) => {
    const auth = {
        auth: {
            apiKey: process.env.MAILGUN_API_KEY,
            domain: process.env.MAILGUN_DOMAIN

        }
    };
    const transporter = nodemailer.createTransport(mailGun(auth));
    const { name, email, message } = req.body

    const sendMail = (name, email, subject, text) => {
        const mailOptions = {
            sender: name,
            from: email,
            to: 'omyblog@hotmail.com',
            subject: subject,
            text: text
        };

        transporter.sendMail(mailOptions, function (err, data) {
            if (err) {
                // res.status(400).json({ error: "Unable to send message, try again!" })
                res.status(400).json({ error: err.message })
            } else {
                res.status(200).json(data)
            }
        });
    }

    if (name != null && name !== "" && email != null && email !== "" && message != null && message !== "") {
        sendMail(name, email, `Support message - ${Date.now}`, message)
    }
    else{
        res.status(400).json({ error: "All fields are required!" })
    }
}

//Auth User
const authUser = async (req, res) => {
    const { email, password } = req.body
    try {
        //check that all fields are filled
        if (email != null && email != "" && password != null && password != '') {

            const user = await User.findOne({ email: email })
            if (user != null) {
                const hashedPassword = crypt.createHash('sha1').update(password).digest('hex')
                if (user.password == hashedPassword) {
                    res.status(200).json({ loggedIn: user.email })
                }
                else {
                    res.status(400).json({ error: "Wrong credentials, try again!" })
                }
            }
            else {
                res.status(400).json({ error: "Wrong credentials, try again!" })
            }
        }
        else {
            res.status(400).json({ error: "All fields are required!" })
        }

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



module.exports = {
    sendSupportMail
}
