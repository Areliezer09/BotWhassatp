const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const { downloadAndProcessHistorySyncNotification } = require('@adiwajshing/baileys')

const flowPrincipal = addKeyword(['hola', 'holi' , 'Buenos días', 'Buenos dias', 'alo', 'Ola' , 'Buenas tardes', 'Buenas noches' , 'hello' , 'Buenas' , 'Buena'])
    .addAnswer('🙌 Hola bienvenido al mundo de *PaintBall-Marcona 🔫*')
    .addAnswer(
        [
            '📌Por favor, ingrese un numero #️⃣ para mostrar informacion',
            '1️⃣ Para ver mas informacion 📄',

            '2️⃣ Para ver un video referencial 🎥',

            '3️⃣ Para ver el horario de atencion 🕐',

            '4️⃣ Para unirte a nuestras redes sociales 📱',

            '5️⃣ Por si desea hablar con una persona 🧍🏽‍♂️'
        ],
        null,
        null,

    )
const flujoPrecios = addKeyword('Precios').addAnswer('Precios de Paintball-Marcona',{
    media: 'https://scontent.fpio1-1.fna.fbcdn.net/v/t1.15752-9/330508729_739759007475694_1213242201212390990_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeF__96pD34wvMjujqDkqlOWJKVudcFysfEkpW51wXKx8dv0WSurJfD_01YjC5rY1D3b83TN4-I5JA0vF3xm9D99&_nc_ohc=z6PHfNNsKrEAX9mgA2H&tn=6dYDAMlqwojhS9LI&_nc_ht=scontent.fpio1-1.fna&oh=03_AdS1tRjVmidizMch419MQQjxOriBV-n3lvAgNZgGuHdwcg&oe=640F727F'
})

const flujoFormasPago = addKeyword('Formas de Pago').addAnswer('Las formas de pago son las siguientes..',{
    media : 'https://scontent.fpio1-1.fna.fbcdn.net/v/t1.15752-9/330341476_3467839400201960_1306380349932472820_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=ae9488&_nc_eui2=AeHirAFW3pdP4w1Sb309lw5DPuOmO4wjHIU-46Y7jCMchX8KCli89vwn1fkJAToXYZeJSsqagM1zkaf4xQPcWZ2p&_nc_ohc=ynbZ5X2DmngAX98g-cA&tn=6dYDAMlqwojhS9LI&_nc_ht=scontent.fpio1-1.fna&oh=03_AdSlAwJ74uwvtTuc5b0t00K2O88ihXyH5ejESJ88LuV7VA&oe=640F4569'
})

const flujoDirecion = addKeyword('Direccion').addAnswer(['La direccion de Paintball-Marcona']).addAnswer(
    'https://goo.gl/maps/YBQ9vuVwUFPJ8XRUA'
)

const flowBotons = addKeyword ('1').addAnswer('*Las reservas se hacen con un 50% de adelanto... Se juega por grupo de 8 o 6 lo cual se dividen en partes iguales, ejemplo si tu grupo es de 8 persona se dividen en 4 contra 4 igualmente si es de 6 persona el grupo. Cada integrante de su grupo compra sus balas por separado, con anticipación se separa su cupo*',{

    buttons: [
        {
            body:'Precios💸'
        },
        {
            body:'Formas de Pago💳'
        },
        {
            body: 'Direccion 📍'
        }
    ]
})

const flowVideo = addKeyword(['2']).addAnswer(['Video Referencial..',
    'https://www.facebook.com/100089429187158/videos/415214944137892/']
)

const flowHorario = addKeyword(['3']).addAnswer(
    ['📆 Horario de atencion: Lunes a Domingo',

     '🕐 Horario: 9 am a 6 pm']
)

const flowRedes = addKeyword(['4']).addAnswer(
    ['🤪 Únete al facebook', 'https://www.facebook.com/profile.php?id=100089429187158',
     '🤪 Únete al TikTok', 'https://www.tiktok.com/@paintballmarcona'])

/*-const flowPersona = addKeyword(['5']).addAnswer([
    '👋🏻 Muy buenas, en breve me pondre en contacto contigo 🧍🏻‍♂️'
])*/

const flowGracias = addKeyword(['gracias']).addAnswer([
    'Gracias por su preferencia. PaintBall-Marcona espera su pronta visita, lo esperamos 🤩'
])

let nombre;
const flowFormulario = addKeyword(['5'])
    .addAnswer(
        ['Hola! 🙌','Escriba su *Nombre* y *Apellido* porfavor'],
        { capture: true },
        async (ctx, { flowDynamic}) => {
            nombre = ctx.body
            Apellido = ctx.body
            return flowDynamic(`Encantado *${nombre,Apellido}* 🤩, pronto me pondré en contacto contigo`)
        }
    )




const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal, flowBotons, flujoPrecios, flowBotons, flowRedes, flowHorario, flowGracias, flowVideo, flujoDirecion, /*flowPersona*/, flujoFormasPago, flowFormulario])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
