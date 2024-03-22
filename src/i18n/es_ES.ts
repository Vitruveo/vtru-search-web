import { Translation } from './types';

const language: Translation = {
    /* Login */

    /* Languages */
    'studio.languages.portuguesePTBR': 'Portugués (pt-BR)',
    'studio.languages.englishUS': 'Inglés (en-US)',
    'studio.languages.spanishES': 'Español (es-ES)',
    'studio.languages.farsiFA': 'Farsi (fa-IR)',
    'studio.languages.russianRU': 'Ruso (ru-RU)',

    /* Home */
    'studio.home.wellcome': 'Bienvenido a',
    'studio.home.title': 'Inicio',
    'studio.home.transforming':
        'Vitruveo está transformando el arte Web3, y eso significa un software completamente nuevo como esta versión "Alpha" de vtruStudio. Alpha significa que el software no está completamente listo y nos estás ayudando a probarlo para que pueda ser mejorado.',
    'studio.home.software':
        'El software actualmente tiene dos características a las que puedes acceder con los botones de abajo:',
    'studio.home.consign': 'Consigue Arte',
    'studio.home.myProfile': 'Mi Perfil',

    /* User Account */
    'studio.userAccount.title': 'Cuenta de Usuario',
    'studio.userAccount.creator': 'Creador',
    'studio.userAccount.logout.button': 'Cerrar Sesión',
    'studio.userAccount.menu.title': 'Mi Perfil',
    'studio.userAccount.menu.subtitle': 'Configuraciones de Usuario',

    /* My Profile */
    'studio.myProfile.title': 'Mi Perfil',
    'studio.myProfile.subtitle':
        'Personaliza tu perfil de Vitruveo con múltiples direcciones de correo electrónico y billeteras.',
    'studio.myProfile.home': 'Inicio',
    'studio.myProfile.saveMessage': 'Datos guardados con éxito',
    'studio.myProfile.accessConsignMessage':
        'Para acceder a la consignación de arte, es necesario completar todos los campos obligatorios en el perfil de usuario',
    'studio.myProfile.form.username.title': 'Nombre de Usuario',
    'studio.myProfile.form.username.placeholder': 'Introduce el nombre de usuario',
    'studio.myProfile.form.usernameRequired.error': 'Se requiere nombre de usuario',
    'studio.myProfile.form.profile.title': 'Cambia tu foto de perfil desde aquí',
    'studio.myProfile.form.profile.reset.button': 'Restablecer',
    'studio.myProfile.form.profile.upload.button': 'Subir',
    'studio.myProfile.form.profile.description': 'Se permite JPG, GIF o PNG. Tamaño máximo de 800KB',
    'studio.myProfile.form.emails.title': 'Correos Electrónicos',
    'studio.myProfile.form.emailsExists.error': 'El correo electrónico ya existe',
    'studio.myProfile.form.addEmails.placeholder': 'Ingrese una dirección de correo electrónico adicional',
    'studio.myProfile.form.code.placeholder': 'escribe un código...',
    'studio.myProfile.form.verify.button': 'Verificar',
    'studio.myProfile.form.delete.button': 'Eliminar',
    'studio.myProfile.form.wallets.title': 'Billeteras',
    'studio.myProfile.verificationCodeSentMessageSuccess': 'código de verificación enviado al correo electrónico',
    'studio.myProfile.verificationCodeSentMessageError':
        'error al enviar el código de verificación al correo electrónico',
    'studio.myProfile.emailVerificationMessageSuccess': 'correo electrónico verificado',
    'studio.myProfile.emailVerificationMessageError': 'error al verificar el código',
    'studio.myProfile.form.wallet.placeholderAdded': 'Conectar billetera adicional',
    'studio.myProfile.form.wallet.placeholder': 'Conectar nueva billetera',
    'studio.myProfile.form.connect.button': 'Conectar',

    /* Consign Artwork */
    'studio.consignArtwork.form.next.button': 'Siguiente',
    'studio.consignArtwork.title': 'Consignar Obra de Arte',
    'studio.consignArtwork.subtitle': 'Completa todas las tareas requeridas y consigna tu obra de arte',

    'studio.consignArtwork.stepName.assetMedia': 'Medios del Activo',
    'studio.consignArtwork.stepName.assetMetadata': 'Metadatos del Activo',
    'studio.consignArtwork.stepName.licenses': 'Licencias',
    'studio.consignArtwork.stepName.termsOfUse': 'Términos de Uso',
    'studio.consignArtwork.stepName.auxiliaryMedia': 'Medios Auxiliares',
    'studio.consignArtwork.optional': 'opcional',

    'studio.consignArtwork.stepStatus.completed': 'Completado',
    'studio.consignArtwork.stepStatus.inProgress': 'En Progreso',
    'studio.consignArtwork.stepStatus.notStarted': 'No Iniciado',
    'studio.consignArtwork.stepStatus.error': 'Error',
    'studio.consignArtwork.stepPublishMessageSuccess': '¡Publicado con éxito!',

    'studio.consignArtwork.stepButton': (data: { status: string }) =>
        `${data.status !== 'notStarted' ? 'Editar' : 'Iniciar'}`,

    'studio.consignArtwork.publishButton': (data: { status: string }) =>
        `${data.status === 'published' ? 'Consignado' : 'Consignar'}`,

    /* Asset Media */
    'studio.consignArtwork.assetMedia.title': 'Medios del Activo',
    'studio.consignArtwork.assetMedia.description': 'Sube los medios para la obra de arte que se está consignando.',
    'studio.consignArtwork.assetMedia.differentUses': 'CARGAR/CREAR VARIACIONES PARA DIFERENTES USOS',
    'studio.consignArtwork.assetMedia.amazing':
        '¡Se ve increíble! Para que tu obra de arte luzca genial en diferentes dispositivos, necesitamos algunas variaciones adicionales.',
    'studio.consignArtwork.assetMedia.haveCreated':
        'Si has creado tus propios archivos para las variaciones a continuación, simplemente súbelos aquí.',
    'studio.consignArtwork.assetMedia.haveNotCreated':
        'Si no has creado tus propios archivos, no te preocupes, simplemente vuelve a subir tu archivo original para cada variación requerida y te ayudaremos a recortar tu archivo aquí mismo.',
    'studio.consignArtwork.assetMedia.previewHelp':
        'El archivo de vista previa será un clip de cinco segundos de tu obra de arte. Puedes subir uno que hayas creado tú mismo o simplemente subir tu archivo original y te ayudaremos a crear ese clip aquí.',
    'studio.consignArtwork.assetMedia.upload.button': 'Subir',
    'studio.consignArtwork.assetMedia.assets': 'Medios',

    'studio.consignArtwork.assetMedia.definition': (data: { definition: 'landscape' | 'square' | 'portrait' }) => {
        return `${
            data.definition === 'landscape' ? 'Paisaje' : data.definition === 'portrait' ? 'Retrato' : 'Cuadrado'
        }`;
    },
    'studio.consignArtwork.assetMedia.image': 'imagen',
    'studio.consignArtwork.assetMedia.video': 'video',
    'studio.consignArtwork.assetMedia.max': (data: { seconds: number }) =>
        `${data.seconds ? `máx / ${data.seconds} segundos` : 'máx.'}`,

    'studio.consignArtwork.assetMedia.mediaRequired': (data: { required: boolean }) =>
        `${data.required ? 'Requerido' : 'Opcional'}`,

    'studio.consignArtwork.assetMedia.mediaIs': 'Este medio es',
    'studio.consignArtwork.assetMedia.cropModal.title': (data: { width: string; height: string }) =>
        `Recorta los medios para la visualización a ${data.width} x ${data.height} píxeles. Haz clic en “Hecho” para guardar.`,

    'studio.consignArtwork.assetMedia.formats': (data: {
        format: 'original' | 'display' | 'exhibition' | 'preview' | 'print';
    }) => {
        if (data.format === 'original') return 'Original';
        if (data.format === 'display') return 'Visualización';
        if (data.format === 'exhibition') return 'Exhibición';
        if (data.format === 'preview') return 'Vista previa';
        if (data.format === 'print') return 'Impresión';
        return '';
    },

    'studio.consignArtwork.assetMedia.modalError.title':
        '¡Vaya! El archivo de medios que has subido tiene los siguientes problemas:',
    'studio.consignArtwork.assetMedia.modalErrorDimensions.title': 'Dimensiones',
    'studio.consignArtwork.assetMedia.modalErrorDimensions.description': (data: {
        definition: string;
        format: string;
        width: string;
        height: string;
    }) =>
        `— El archivo de medios para una imagen ${data.definition} (${data.format}) debe ser al menos de ${data.width} x ${data.height} píxeles`,

    'studio.consignArtwork.assetMedia.modalErrorSize.title': 'Tamaño',
    'studio.consignArtwork.assetMedia.modalErrorSize.description': (data: {
        definition: string;
        format: string;
        sizeError: string;
    }) =>
        `— El tamaño del archivo de medios para una imagen ${data.definition} (${data.format}) no puede exceder ${data.sizeError}`,

    'studio.consignArtwork.assetMedia.dragAndDrop': 'CARGA DE OBRA DE ARTE ORIGINAL',
    'studio.consignArtwork.assetMedia.dragAndDrop.description':
        'Para cargar tu obra de arte original, arrastra y suelta tu archivo aquí o haz clic para seleccionar tu archivo desde tu computadora.',
    'studio.consignArtwork.assetMedia.imageTypes': 'Imagen: JPEG, PNG, GIF, SVG, WEBP',
    'studio.consignArtwork.assetMedia.videoTypes': 'Video: MP4, WEBM',

    /* Asset Metadata */
    'studio.consignArtwork.assetMetadata.title': 'Metadatos del Activo',
    'studio.consignArtwork.assetMetadata.description': 'Todos los Metadatos del Activo son visibles para el público.',
    'studio.consignArtwork.assetMetadata.section.context': 'Contexto',
    'studio.consignArtwork.assetMetadata.section.taxonomy': 'Taxonomía',
    'studio.consignArtwork.assetMetadata.section.creators': 'Creadores',
    'studio.consignArtwork.assetMetadata.section.provenance': 'Procedencia',
    'studio.consignArtwork.assetMetadata.section.custom': 'Personalizado',
    'studio.consignArtwork.assetMetadata.section.assets': 'Activos',

    'studio.consignArtwork.assetMetadata.field.title': 'Título',
    'studio.consignArtwork.assetMetadata.field.title.placeholder': 'Título de la obra',
    'studio.consignArtwork.assetMetadata.field.description': 'Descripción',
    'studio.consignArtwork.assetMetadata.field.description.placeholder': 'Breve descripción de la obra',
    'studio.consignArtwork.assetMetadata.field.tag': 'Etiqueta',
    'studio.consignArtwork.assetMetadata.field.tag.placeholder': 'Etiquetas relevantes para la obra',
    'studio.consignArtwork.assetMetadata.field.moods': 'Estados de ánimo',
    'studio.consignArtwork.assetMetadata.field.moods.placeholder': 'Sentimientos que evoca la obra',
    'studio.consignArtwork.assetMetadata.field.moods.option.admiration': 'Admiración',
    'studio.consignArtwork.assetMetadata.field.moods.option.absorbing': 'Absorbente',
    'studio.consignArtwork.assetMetadata.field.moods.option.amusement': 'Diversión',
    'studio.consignArtwork.assetMetadata.field.moods.option.adoration': 'Adoración',
    'studio.consignArtwork.assetMetadata.field.moods.option.awe': 'Asombro',
    'studio.consignArtwork.assetMetadata.field.moods.option.anxiety': 'Ansiedad',
    'studio.consignArtwork.assetMetadata.field.moods.option.boredom': 'Aburrimiento',
    'studio.consignArtwork.assetMetadata.field.moods.option.brooding': 'Pensativo',
    'studio.consignArtwork.assetMetadata.field.moods.option.calmness': 'Calma',
    'studio.consignArtwork.assetMetadata.field.moods.option.chills': 'Escalofríos',
    'studio.consignArtwork.assetMetadata.field.moods.option.chaotic': 'Caótico',
    'studio.consignArtwork.assetMetadata.field.moods.option.connectedness': 'Conexión',
    'studio.consignArtwork.assetMetadata.field.moods.option.cosmic': 'Cósmico',
    'studio.consignArtwork.assetMetadata.field.moods.option.confusion': 'Confusión',
    'studio.consignArtwork.assetMetadata.field.moods.option.dread': 'Temor',
    'studio.consignArtwork.assetMetadata.field.moods.option.distaste': 'Repugnancia',
    'studio.consignArtwork.assetMetadata.field.moods.option.disgust': 'Asco',
    'studio.consignArtwork.assetMetadata.field.moods.option.dreary': 'Sombrío',
    'studio.consignArtwork.assetMetadata.field.moods.option.disorienting': 'Desorientador',
    'studio.consignArtwork.assetMetadata.field.moods.option.dreamy': 'Soñador',
    'studio.consignArtwork.assetMetadata.field.moods.option.desire': 'Deseo',
    'studio.consignArtwork.assetMetadata.field.moods.option.elegant': 'Elegante',
    'studio.consignArtwork.assetMetadata.field.moods.option.humorous': 'Humorístico',
    'studio.consignArtwork.assetMetadata.field.moods.option.intimate': 'Íntimo',
    'studio.consignArtwork.assetMetadata.field.moods.option.intricate': 'Intrincado',
    'studio.consignArtwork.assetMetadata.field.moods.option.love': 'Amor',
    'studio.consignArtwork.assetMetadata.field.moods.option.lively': 'Animado',
    'studio.consignArtwork.assetMetadata.field.moods.option.mystical': 'Místico',
    'studio.consignArtwork.assetMetadata.field.moods.option.mysterious': 'Misterioso',
    'studio.consignArtwork.assetMetadata.field.moods.option.nostalgia': 'Nostalgia',
    'studio.consignArtwork.assetMetadata.field.moods.option.ornate': 'Ornamentado',
    'studio.consignArtwork.assetMetadata.field.moods.option.psychedelic': 'Psicodélico',
    'studio.consignArtwork.assetMetadata.field.moods.option.serenity': 'Serenidad',
    'studio.consignArtwork.assetMetadata.field.moods.option.sadness': 'Tristeza',
    'studio.consignArtwork.assetMetadata.field.moods.option.sensual': 'Sensual',
    'studio.consignArtwork.assetMetadata.field.moods.option.spiritual': 'Espiritual',
    'studio.consignArtwork.assetMetadata.field.moods.option.strange': 'Extraño',
    'studio.consignArtwork.assetMetadata.field.moods.option.striking': 'Impactante',
    'studio.consignArtwork.assetMetadata.field.moods.option.tragic': 'Trágico',
    'studio.consignArtwork.assetMetadata.field.moods.option.tense': 'Tenso',
    'studio.consignArtwork.assetMetadata.field.moods.option.vibrant': 'Vibrante',
    'studio.consignArtwork.assetMetadata.field.moods.option.violent': 'Violento',
    'studio.consignArtwork.assetMetadata.field.moods.option.wonder': 'Asombro',
    'studio.consignArtwork.assetMetadata.field.moods.option.whimsical': 'Caprichoso',

    'studio.consignArtwork.assetMetadata.field.errors': (data: { message: string }) =>
        `${data.message === 'required' || data.message === 'minItems' ? 'Campo requerido' : ''}`,

    /* Licenses */
    'studio.consignArtwork.licenses.title': 'Licencias',
    'studio.consignArtwork.licenses.description':
        'Actualmente, Vitruveo ofrece cuatro formas de licenciar/vender su obra de arte. Aquí puedes elegir cualquiera de estas opciones de licencia:',
    'studio.consignArtwork.licenses.oneLicense.error': 'Por favor, añade al menos una licencia',
    'studio.consignArtwork.licenses.fillFields.error': 'Rellena los campos correctamente.',
    'studio.consignArtwork.licenses.alreadyAdded': 'Licencia ya añadida',
    'studio.consignArtwork.licenses.delete.button': 'Eliminar',
    'studio.consignArtwork.licenses.add.button': 'Añadir',

    'studio.consignArtwork.licenses.field.checkBoolean': (data: { checkBoolean: unknown }) =>
        `${data.checkBoolean === true ? 'sí' : data.checkBoolean === false ? 'no' : data.checkBoolean}`,
    'studio.consignArtwork.licenses.field.errors': (data: { message: string }) =>
        `${data.message === 'field required' ? 'campo requerido' : ''}`,
    'studio.consignArtwork.licenses.field.stream': 'Stream v1.0',
    'studio.consignArtwork.licenses.field.print': 'Print v1.0',
    'studio.consignArtwork.licenses.field.NFT': 'NFT v1.0',
    'studio.consignArtwork.licenses.field.maximumUnits': 'Unidades Máximas',
    'studio.consignArtwork.licenses.field.unitPrice': 'Precio por Unidad',
    'studio.consignArtwork.licenses.field.maximumEditions': 'Ediciones Máximas',
    'studio.consignArtwork.licenses.field.editionPrice': 'Precio de la Edición',
    'studio.consignArtwork.licenses.field.elasticEditions': 'Ediciones Elásticas',
    'studio.consignArtwork.licenses.license': 'Licencia',

    'studio.consignArtwork.licenses.nft.description':
        'Esta licencia hace que la obra de arte esté disponible para la venta bajo uno de varios modelos de precios de edición. Cuando se vende, se acuña un NFT de la obra de arte y se entrega al comprador.',
    'studio.consignArtwork.licenses.nft.enable':
        'Habilite esta licencia si desea que los compradores tengan la propiedad de un coleccionable digital de la obra de arte.',

    'studio.consignArtwork.licenses.nft.selectEdition.title': 'Seleccionar Edición',
    'studio.consignArtwork.licenses.nft.selectEdition.elasticEditions':
        'es un modelo flexible que le da al comprador la capacidad de combinar varias ediciones en una, cambiando dinámicamente el tamaño de la edición.',
    'studio.consignArtwork.licenses.nft.selectEdition.singleEdition': 'es un modelo fijo 1/1.',
    'studio.consignArtwork.licenses.nft.selectEdition.unlimitedEditions':
        'es un modelo de tarifa o gratuito para ediciones ilimitadas.',

    'studio.consignArtwork.licenses.nft.elasticEditions.title': 'Ediciones Elásticas',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionPrice.title': 'Precio de la Edición (USD)',
    'studio.consignArtwork.licenses.nft.elasticEditions.numberOfEditions.title': 'Número de Ediciones',
    'studio.consignArtwork.licenses.nft.elasticEditions.totalPrice.title': 'Precio Total (USD)',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionDiscount.title': 'Descuento de Edición',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionPrice':
        '“Precio de la Edición” es el precio de la obra de arte en dólares estadounidenses.',
    'studio.consignArtwork.licenses.nft.elasticEditions.numberOfEditions':
        '“Número de Ediciones” es la cantidad de ediciones de la obra de arte que se pueden acuñar.',
    'studio.consignArtwork.licenses.nft.elasticEditions.totalPrice':
        '“Precio Total” es el “Precio de la Edición” multiplicado por el “Número de Ediciones”.',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionDiscount':
        '“Descuento de Edición” es el descuento para el comprador al comprar varias ediciones. Se calcula dividiendo 10 por el “Número de Ediciones”. Si está habilitado, el descuento se aplica para cada edición después de la primera.',
    'studio.consignArtwork.licenses.nft.singleEdition.title': 'Edición Única',
    'studio.consignArtwork.licenses.nft.singleEdition.editionPrice':
        '“Precio de la Edición” es el precio de la obra de arte en dólares estadounidenses.',
    'studio.consignArtwork.licenses.nft.singleEdition.editionPrice.title': 'Precio de la Edición (USD)',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.title': 'Ediciones Ilimitadas',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.editionPrice':
        '“Precio de la Edición” es el precio de la obra de arte en dólares estadounidenses.',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.editionPrice.title': 'Precio de la Edición (USD)',

    'studio.consignArtwork.licenses.stream.description':
        'Esta licencia hace que la obra de arte esté disponible para los curadores para incluirla en listas de reproducción para transmitir arte a marcos digitales. Los ingresos por transmisión se calculan automáticamente en función del uso y los acuerdos de precios negociados.',
    'studio.consignArtwork.licenses.stream.enable':
        'Habilite esta licencia si desea que los curadores incluyan su obra de arte en listas de reproducción que utilizan los consumidores y las empresas para presentaciones de diapositivas en marcos digitales.',
    'studio.consignArtwork.licenses.stream.enable.description':
        'Los ingresos por transmisión se calculan automáticamente en función del uso y los acuerdos de precios negociados.',
    'studio.consignArtwork.licenses.stream.unlimitedStreaming': 'Transmisión Ilimitada',
    'studio.consignArtwork.licenses.stream.unlimitedStreaming.description':
        'La obra de arte puede ser utilizada para transmisión en escenarios ilimitados.',

    'studio.consignArtwork.licenses.print.description':
        'Esta licencia hace que la obra de arte esté disponible para los usuarios finales para imprimir en un solo artículo físico utilizando la tecnología de impresión bajo demanda (POD). La licencia es libremente transferible hasta el punto de impresión, después de lo cual es transferible únicamente al propietario del artículo físico.',
    'studio.consignArtwork.licenses.print.enable':
        'Habilite esta licencia si desea que los usuarios finales utilicen su arte para aplicaciones de impresión bajo demanda (POD). Esta licencia es para impresión individual; no se permite la impresión en masa.',
    'studio.consignArtwork.licenses.print.singlePrint.title': 'Impresión Única',
    'studio.consignArtwork.licenses.print.singlePrint.description':
        '“Precio Unitario” es el precio de la obra de arte en dólares estadounidenses para una sola impresión.',
    'studio.consignArtwork.licenses.print.singlePrint.field': 'Precio Unitario (USD)',

    'studio.consignArtwork.licenses.remix.description':
        'Esta licencia hace que la obra de arte esté disponible para los usuarios finales para su uso en aplicaciones de Remix utilizando la',
    'studio.consignArtwork.licenses.remix.description2':
        'licencia que permite el uso de remix para fines no comerciales.',
    'studio.consignArtwork.licenses.remix.singleRemix.title': 'Remix Único',
    'studio.consignArtwork.licenses.remix.singleRemix.description':
        '“Precio Unitario” es el precio de la obra de arte en dólares estadounidenses para un solo remix.',
    'studio.consignArtwork.licenses.remix.singleRemix.field': 'Precio Unitario (USD)',
    'studio.consignArtwork.licenses.remix.enable':
        'Habilite esta licencia si desea que los usuarios finales utilicen su arte en aplicaciones de Remix. El resultado del remix solo puede ser utilizado para fines no comerciales.',

    /* Terms of Use */
    'studio.consignArtwork.termsOfUse.title': 'Términos de Uso',
    'studio.consignArtwork.termsOfUse.description': 'Completa todas las tareas requeridas y consigna tu obra de arte',
    'studio.consignArtwork.termsOfUse.accept.button': (data: { contract: boolean; scrolledToBottom: boolean }) =>
        data.contract ? 'Aceptado' : data.scrolledToBottom ? 'Aceptar Contrato' : 'Desplázate hasta el final',
    'studio.consignArtwork.termsOfUse.isOriginal':
        'Por la presente, confirmo que los archivos del Activo y los Medios Auxiliares son obras originales y auténticas que han sido creadas por los creadores indicados en la presentación de metadatos y no copiadas, robadas o plagiadas de ninguna otra fuente.',
    'studio.consignArtwork.termsOfUse.generatedArtworkAI':
        'Por la presente, confirmo que si alguna parte de los archivos del Activo y los Medios Auxiliares fueron creados utilizando Inteligencia Artificial, he respondido "Sí" en el campo de Metadatos para "Generación por IA".',
    'studio.consignArtwork.termsOfUse.notMintedOtherBlockchain':
        'Por la presente, confirmo que esta obra no está acuñada en ninguna otra blockchain, ofrecida, consignada o listada para la venta en ninguna otra plataforma, y no será acuñada, ofrecida, consignada o listada mientras la lista esté activa en esta plataforma.',

    /* Auxiliary Media */
    'studio.consignArtwork.auxiliaryMedia.description':
        'Suba activos de medios auxiliares para Detrás de las escenas (BTS) y Realidad Aumentada (AR).',
    'studio.consignArtwork.auxiliaryMedia.title': 'Medios Auxiliares',
    'studio.consignArtwork.auxiliaryMedia.subTitle': 'Activos de Medios Auxiliares',
    'studio.consignArtwork.auxiliaryMedia.arImage.title': 'Imagen AR',
    'studio.consignArtwork.auxiliaryMedia.arVideo.title': 'Video AR',
    'studio.consignArtwork.auxiliaryMedia.btsImage.title': 'Imagen BTS',
    'studio.consignArtwork.auxiliaryMedia.btsVideo.title': 'Video BTS',
    'studio.consignArtwork.auxiliaryMedia.codeZip.title': 'Código Zip',

    /* Consignment Status */
    'studio.consignArtwork.consignmentStatus.title': 'Estado de Consignación',
    'studio.consignArtwork.consignmentStatus.description':
        '¡Buen trabajo! Tu obra de arte está lista para la consignación.',
    'studio.consignArtwork.consignmentStatus.message': 'Esta función estará disponible pronto.',
    'studio.consignArtwork.consignmentStatus.yes': 'Sí',
    'studio.consignArtwork.consignmentStatus.no': 'No',
    'studio.consignArtwork.consignmentStatus.edit': 'Editar',
    'studio.consignArtwork.consignmentStatus.view': 'Ver',
    'studio.consignArtwork.consignmentStatus.search': 'Buscar',
    'studio.consignArtwork.consignmentStatus.license': 'Licencia',

    'studio.consignArtwork.consignmentStatus.draft.title': 'Borrador',
    'studio.consignArtwork.consignmentStatus.preview.title': 'Vista Previa',
    'studio.consignArtwork.consignmentStatus.activate.title': 'Activar',

    'studio.consignArtwork.consignmentStatus.activation.title': 'Activación',
    'studio.consignArtwork.consignmentStatus.activation.description':
        'La activación consigna tu obra de arte a la cadena de bloques y requiere un Crédito de Creador.',
    'studio.consignArtwork.consignmentStatus.creatorCreditsRequired': 'Créditos de Creador Requeridos',
    'studio.consignArtwork.consignmentStatus.creatorCreditsAvailable': 'Créditos de Creador Disponibles',
    'studio.consignArtwork.consignmentStatus.viewArtwork.button': 'Ver Obra de Arte',

    /* BackModalConfirm */
    'studio.consignArtwork.backModal.title': '¿Te gustaría guardar la información?',
    'studio.consignArtwork.backModal.confirm.button': 'Guardar',
    'studio.consignArtwork.backModal.cancel.button': 'No',

    /* Sidebar */
    'studio.sidebar.consign': 'Consignar Obra de Arte',

    /* Footer */
    'studio.footer.thisStep': 'Este paso ha sido',
    'studio.footer.completed': 'Completado',
    'studio.footer.inProgress': 'En Progreso',
    'studio.footer.notYet': 'y aún no está completo',
    'studio.footer.step': 'Paso',
    'studio.footer.of': 'de',
    'studio.footer.save': 'Guardar',
    'studio.footer.back': 'Atrás',
};

export default language;
