const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const { downloadAndProcessHistorySyncNotification } = require('@adiwajshing/baileys')

const flowPrincipal = addKeyword(['hola', 'holi' , 'Buenos dΓ­as', 'Buenos dias', 'alo', 'Ola' , 'Buenas tardes', 'Buenas noches' , 'hello' , 'Buenas' , 'Buena'])
    .addAnswer('π Hola bienvenido al mundo de *PaintBall-Marcona π«*')
    .addAnswer(
        [
            'πPor favor, ingrese un numero #οΈβ£ para mostrar informacion',
            '1οΈβ£ Para ver mas informacion π',

            '2οΈβ£ Para ver un video referencial π₯',

            '3οΈβ£ Para ver el horario de atencion π',

            '4οΈβ£ Para unirte a nuestras redes sociales π±',

            '5οΈβ£ Por si desea hablar con una persona π§π½ββοΈ'
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

const flowBotons = addKeyword ('1').addAnswer('*Las reservas se hacen con un 50% de adelanto... Se juega por grupo de 8 o 6 lo cual se dividen en partes iguales, ejemplo si tu grupo es de 8 persona se dividen en 4 contra 4 igualmente si es de 6 persona el grupo. Cada integrante de su grupo compra sus balas por separado, con anticipaciΓ³n se separa su cupo*',{

    buttons: [
        {
            body:'PreciosπΈ'
        },
        {
            body:'Formas de Pagoπ³'
        },
        {
            body: 'Direccion π'
        }
    ]
})

const flowVideo = addKeyword(['2']).addAnswer(['Video Referencial..',
    'https://www.facebook.com/100089429187158/videos/415214944137892/']
)

const flowHorario = addKeyword(['3']).addAnswer(
    ['π Horario de atencion: Lunes a Domingo',

     'π Horario: 9 am a 6 pm']
)

const flowRedes = addKeyword(['4']).addAnswer(
    ['π€ͺ Γnete al facebook', 'https://www.facebook.com/profile.php?id=100089429187158',
     'π€ͺ Γnete al TikTok', 'https://www.tiktok.com/@paintballmarcona'])

/*-const flowPersona = addKeyword(['5']).addAnswer([
    'ππ» Muy buenas, en breve me pondre en contacto contigo π§π»ββοΈ'
])*/

const flowGracias = addKeyword(['gracias']).addAnswer([
    'Gracias por su preferencia. PaintBall-Marcona espera su pronta visita, lo esperamos π€©'
])

let nombre;
const flowFormulario = addKeyword(['5'])
    .addAnswer(
        ['Hola! π','Escriba su *Nombre* y *Apellido* porfavor'],
        { capture: true },
        async (ctx, { flowDynamic}) => {
            nombre = ctx.body
            Apellido = ctx.body
            return flowDynamic(`Encantado *${nombre,Apellido}* π€©, pronto me pondrΓ© en contacto contigo`)
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
