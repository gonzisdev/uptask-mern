import nodemailer from 'nodemailer'

export const emailRegistro = async (datos) => {
    const { email, nombre, token } = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    })

    // Informacion del email
    const info = await transport.sendMail({
        from: 'UpTask - Administrador de Proyectos <cuentas@uptask.com>',
        to: email,
        subject: 'UpTask - Confirma tu cuenta',
        text: 'Confirma tu cuenta en UpTask',
        html: `
            <p>Hola ${nombre},</p>
            <p>Confirma tu cuenta en el siguiente enlace: <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Confirmar cuenta</a></p>
            <p>Si no creaste esta cuenta, puedes ignorar este mensaje.</p>   
        `
    })
}

export const emailOlvidePassword = async (datos) => {
    const { email, nombre, token } = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
    })

    // Informacion del email
    const info = await transport.sendMail({
        from: 'UpTask - Administrador de Proyectos <cuentas@uptask.com>',
        to: email,
        subject: 'UpTask - Reestablece tu contraseña',
        text: 'Reestablece tu contraseña',
        html: `
            <p>Hola ${nombre},</p>
            <p>Genera una nueva contraseña en el siguiente enlace: <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Confirmar cuenta</a></p>
            <p>Si no solicitaste reestablecer tu contraseña, puedes ignorar este mensaje.</p>   
        `
    })
}

