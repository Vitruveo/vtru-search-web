import { Translation } from './types';

const language: Translation = {
    /* Login */

    /* Languages */
    'studio.languages.portuguesePTBR': 'Португальский (pt-BR)',
    'studio.languages.englishUS': 'Английский (en-US)',
    'studio.languages.spanishES': 'Испанский (es-ES)',
    'studio.languages.farsiFA': 'Фарси (fa-IR)',
    'studio.languages.russianRU': 'Русский (ru-RU)',

    /* Home */
    'studio.home.wellcome': 'Добро пожаловать в',
    'studio.home.title': 'Главная',
    'studio.home.transforming':
        'Vitruveo трансформирует искусство Web3, и это означает совершенно новое программное обеспечение, такое как эта "Alpha" версия vtruStudio. Alpha означает, что программное обеспечение еще не полностью готово, и вы помогаете нам его тестировать, чтобы оно стало лучше.',
    'studio.home.software':
        'У программного обеспечения в настоящее время есть две функции, к которым вы можете получить доступ с помощью кнопок ниже:',
    'studio.home.consign': 'Подать Работу',
    'studio.home.myProfile': 'Мой профиль',

    /* User Account */
    'studio.userAccount.title': 'Учетная запись пользователя',
    'studio.userAccount.creator': 'Создатель',
    'studio.userAccount.logout.button': 'Выйти',
    'studio.userAccount.menu.title': 'Мой профиль',
    'studio.userAccount.menu.subtitle': 'Настройки пользователя',

    /* My Profile */
    'studio.myProfile.title': 'Мой профиль',
    'studio.myProfile.subtitle':
        'Настройте свой профиль Vitruveo с несколькими адресами электронной почты и кошельками.',
    'studio.myProfile.home': 'Главная',
    'studio.myProfile.saveMessage': 'Данные успешно сохранены',
    'studio.myProfile.accessConsignMessage':
        'Для доступа к подаче произведения искусства необходимо заполнить все обязательные поля в профиле пользователя',
    'studio.myProfile.form.username.title': 'Имя пользователя',
    'studio.myProfile.form.username.placeholder': 'Введите имя пользователя',
    'studio.myProfile.form.usernameRequired.error': 'Имя пользователя обязательно',
    'studio.myProfile.form.profile.title': 'Измените свою фотографию профиля здесь',
    'studio.myProfile.form.profile.reset.button': 'Сбросить',
    'studio.myProfile.form.profile.upload.button': 'Загрузить',
    'studio.myProfile.form.profile.description': 'Разрешенные форматы: JPG, GIF или PNG. Максимальный размер 800Кб',
    'studio.myProfile.form.emails.title': 'Электронная почта',
    'studio.myProfile.form.emailsExists.error': 'Электронная почта уже существует',
    'studio.myProfile.form.addEmails.placeholder': 'Введите дополнительный адрес электронной почты',
    'studio.myProfile.form.code.placeholder': 'введите код...',
    'studio.myProfile.form.verify.button': 'Подтвердить',
    'studio.myProfile.form.delete.button': 'Удалить',
    'studio.myProfile.form.wallets.title': 'Кошельки',
    'studio.myProfile.verificationCodeSentMessageSuccess': 'Код подтверждения отправлен на электронную почту',
    'studio.myProfile.verificationCodeSentMessageError': 'Ошибка отправки кода подтверждения на электронную почту',
    'studio.myProfile.emailVerificationMessageSuccess': 'Электронная почта подтверждена',
    'studio.myProfile.emailVerificationMessageError': 'Неверный код подтверждения',
    'studio.myProfile.form.wallet.placeholderAdded': 'Подключить дополнительный кошелек',
    'studio.myProfile.form.wallet.placeholder': 'Подключить новый кошелек',
    'studio.myProfile.form.connect.button': 'Подключить',

    /* Consign Artwork */
    'studio.consignArtwork.form.next.button': 'Далее',
    'studio.consignArtwork.title': 'Подать Работу',
    'studio.consignArtwork.subtitle': 'Выполните все необходимые задачи и передайте свое произведение искусства',

    'studio.consignArtwork.stepName.assetMedia': 'Медиафайлы',
    'studio.consignArtwork.stepName.assetMetadata': 'Метаданные мадиафайлов',
    'studio.consignArtwork.stepName.licenses': 'Лицензии',
    'studio.consignArtwork.stepName.termsOfUse': 'Условия использования',
    'studio.consignArtwork.stepName.auxiliaryMedia': 'Вспомогательные Медиа',
    'studio.consignArtwork.optional': 'необязательный',

    'studio.consignArtwork.stepStatus.completed': 'Завершено',
    'studio.consignArtwork.stepStatus.inProgress': 'В процессе',
    'studio.consignArtwork.stepStatus.notStarted': 'Не начато',
    'studio.consignArtwork.stepStatus.error': 'Ошибка',
    'studio.consignArtwork.stepPublishMessageSuccess': 'Успешно опубликовано!',

    'studio.consignArtwork.stepButton': (data: { status: string }) =>
        `${data.status !== 'notStarted' ? 'Редактировать' : 'Начать'}`,

    'studio.consignArtwork.publishButton': (data: { status: string }) =>
        `${data.status === 'published' ? 'Передано' : 'Передать'}`,

    /* Asset Media */
    'studio.consignArtwork.assetMedia.title': 'Медиафайлы',
    'studio.consignArtwork.assetMedia.description': 'Загрузите Ваше произведение искусства.',
    'studio.consignArtwork.assetMedia.differentUses': 'ЗАГРУЗИТЬ/СОЗДАТЬ ВАРИАНТЫ ДЛЯ РАЗЛИЧНЫХ ИСПОЛЬЗОВАНИЙ',
    'studio.consignArtwork.assetMedia.amazing':
        'Выглядит потрясающе! Для того чтобы ваше произведение искусства выглядело отлично на разных устройствах, нам нужно еще несколько вариаций.',
    'studio.consignArtwork.assetMedia.haveCreated':
        'Если вы создали свои собственные файлы для нижеперечисленных вариаций, просто загрузите каждый из них здесь.',
    'studio.consignArtwork.assetMedia.haveNotCreated':
        'Если вы не создали свои собственные файлы, не волнуйтесь, просто загрузите ваш оригинальный файл снова для каждой необходимой вариации, и мы поможем вам обрезать ваш файл прямо здесь.',
    'studio.consignArtwork.assetMedia.previewHelp':
        'Файл предварительного просмотра будет пяти секундным клипом вашего произведения искусства. Вы можете загрузить тот, который создали сами, или просто загрузить свой оригинальный файл, и мы поможем вам создать этот клип здесь.',
    'studio.consignArtwork.assetMedia.upload.button': 'Загрузить',
    'studio.consignArtwork.assetMedia.assets': 'Медиафайлы',

    'studio.consignArtwork.assetMedia.definition': (data: { definition: 'landscape' | 'square' | 'portrait' }) => {
        return `${data.definition === 'landscape' ? 'Пейзаж' : data.definition === 'portrait' ? 'Портрет' : 'Квадрат'}`;
    },
    'studio.consignArtwork.assetMedia.image': 'изображение',
    'studio.consignArtwork.assetMedia.video': 'видео',
    'studio.consignArtwork.assetMedia.max': (data: { seconds: number }) =>
        `${data.seconds ? `макс / ${data.seconds} сек.` : 'максимально'}`,

    'studio.consignArtwork.assetMedia.mediaRequired': (data: { required: boolean }) =>
        `${data.required ? 'Требуется' : 'Необязательно'}`,

    'studio.consignArtwork.assetMedia.mediaIs': 'Это медиа',
    'studio.consignArtwork.assetMedia.cropModal.title': (data: { width: string; height: string }) =>
        `Обрезать медиа для отображения до ${data.width} x ${data.height} пикселей. Нажмите «Готово», чтобы сохранить.`,

    'studio.consignArtwork.assetMedia.formats': (data: {
        format: 'original' | 'display' | 'exhibition' | 'preview' | 'print';
    }) => {
        if (data.format === 'original') return 'Оригинал';
        if (data.format === 'display') return 'Отображение';
        if (data.format === 'exhibition') return 'Выставка';
        if (data.format === 'preview') return 'Предварительный просмотр';
        if (data.format === 'print') return 'Печать';
        return '';
    },

    'studio.consignArtwork.assetMedia.modalError.title': 'Ой! Загруженный вами медиафайл имеет следующие проблемы:',
    'studio.consignArtwork.assetMedia.modalErrorDimensions.title': 'Размеры',
    'studio.consignArtwork.assetMedia.modalErrorDimensions.description': (data: {
        definition: string;
        format: string;
        width: string;
        height: string;
    }) =>
        `— Медиафайл для ${data.definition} изображения (${data.format}) должен быть как минимум ${data.width} x ${data.height} пикселей`,

    'studio.consignArtwork.assetMedia.modalErrorSize.title': 'Размер',
    'studio.consignArtwork.assetMedia.modalErrorSize.description': (data: {
        definition: string;
        format: string;
        sizeError: string;
    }) =>
        `— Размер медиафайла для ${data.definition} изображения (${data.format}) не может превышать ${data.sizeError}`,

    'studio.consignArtwork.assetMedia.dragAndDrop': 'ЗАГРУЗКА ОРИГИНАЛЬНОГО ИЗОБРАЖЕНИЯ',
    'studio.consignArtwork.assetMedia.dragAndDrop.description':
        'Чтобы загрузить свою оригинальную художественную работу, перетащите свой файл сюда или нажмите, чтобы выбрать файл с вашего компьютера.',
    'studio.consignArtwork.assetMedia.imageTypes': 'Изображение: JPEG, PNG, GIF, SVG, WEBP',
    'studio.consignArtwork.assetMedia.videoTypes': 'Видео: MP4, WEBM',

    /* Asset Metadata */
    'studio.consignArtwork.assetMetadata.title': 'Метаданные медиафайлов',
    'studio.consignArtwork.assetMetadata.description': 'Все метаданные видны публике.',
    'studio.consignArtwork.assetMetadata.section.context': 'Контекст',
    'studio.consignArtwork.assetMetadata.section.taxonomy': 'Таксономия',
    'studio.consignArtwork.assetMetadata.section.creators': 'Авторы',
    'studio.consignArtwork.assetMetadata.section.provenance': 'Провенанс',
    'studio.consignArtwork.assetMetadata.section.custom': 'На заказ',
    'studio.consignArtwork.assetMetadata.section.assets': 'Активы',

    'studio.consignArtwork.assetMetadata.field.title': 'Название',
    'studio.consignArtwork.assetMetadata.field.title.placeholder': 'Название произведения',
    'studio.consignArtwork.assetMetadata.field.description': 'Описание',
    'studio.consignArtwork.assetMetadata.field.description.placeholder': 'Краткое описание произведения',
    'studio.consignArtwork.assetMetadata.field.tag': 'Тег',
    'studio.consignArtwork.assetMetadata.field.tag.placeholder': 'Теги, связанные с произведением',
    'studio.consignArtwork.assetMetadata.field.moods': 'Настроения',
    'studio.consignArtwork.assetMetadata.field.moods.placeholder': 'Чувства, вызываемые произведением',
    'studio.consignArtwork.assetMetadata.field.moods.option.admiration': 'Восхищение',
    'studio.consignArtwork.assetMetadata.field.moods.option.absorbing': 'Поглощающий',
    'studio.consignArtwork.assetMetadata.field.moods.option.amusement': 'Забава',
    'studio.consignArtwork.assetMetadata.field.moods.option.adoration': 'Почтение',
    'studio.consignArtwork.assetMetadata.field.moods.option.awe': 'Страх',
    'studio.consignArtwork.assetMetadata.field.moods.option.anxiety': 'Тревога',
    'studio.consignArtwork.assetMetadata.field.moods.option.boredom': 'Скука',
    'studio.consignArtwork.assetMetadata.field.moods.option.brooding': 'Замедленный',
    'studio.consignArtwork.assetMetadata.field.moods.option.calmness': 'Спокойствие',
    'studio.consignArtwork.assetMetadata.field.moods.option.chills': 'Мурашки',
    'studio.consignArtwork.assetMetadata.field.moods.option.chaotic': 'Хаотичный',
    'studio.consignArtwork.assetMetadata.field.moods.option.connectedness': 'Связь',
    'studio.consignArtwork.assetMetadata.field.moods.option.cosmic': 'Космический',
    'studio.consignArtwork.assetMetadata.field.moods.option.confusion': 'Путаница',
    'studio.consignArtwork.assetMetadata.field.moods.option.dread': 'Страх',
    'studio.consignArtwork.assetMetadata.field.moods.option.distaste': 'Отвращение',
    'studio.consignArtwork.assetMetadata.field.moods.option.disgust': 'Отвращение',
    'studio.consignArtwork.assetMetadata.field.moods.option.dreary': 'Мрачный',
    'studio.consignArtwork.assetMetadata.field.moods.option.disorienting': 'Дезориентирующий',
    'studio.consignArtwork.assetMetadata.field.moods.option.dreamy': 'Мечтательный',
    'studio.consignArtwork.assetMetadata.field.moods.option.desire': 'Желание',
    'studio.consignArtwork.assetMetadata.field.moods.option.elegant': 'Элегантный',
    'studio.consignArtwork.assetMetadata.field.moods.option.humorous': 'Юмористический',
    'studio.consignArtwork.assetMetadata.field.moods.option.intimate': 'Интимный',
    'studio.consignArtwork.assetMetadata.field.moods.option.intricate': 'Сложный',
    'studio.consignArtwork.assetMetadata.field.moods.option.love': 'Любовь',
    'studio.consignArtwork.assetMetadata.field.moods.option.lively': 'Живой',
    'studio.consignArtwork.assetMetadata.field.moods.option.mystical': 'Мистический',
    'studio.consignArtwork.assetMetadata.field.moods.option.mysterious': 'Таинственный',
    'studio.consignArtwork.assetMetadata.field.moods.option.nostalgia': 'Ностальгия',
    'studio.consignArtwork.assetMetadata.field.moods.option.ornate': 'Изысканный',
    'studio.consignArtwork.assetMetadata.field.moods.option.psychedelic': 'Психоделический',
    'studio.consignArtwork.assetMetadata.field.moods.option.serenity': 'Смирение',
    'studio.consignArtwork.assetMetadata.field.moods.option.sadness': 'Печаль',
    'studio.consignArtwork.assetMetadata.field.moods.option.sensual': 'Сенсуальный',
    'studio.consignArtwork.assetMetadata.field.moods.option.spiritual': 'Духовный',
    'studio.consignArtwork.assetMetadata.field.moods.option.strange': 'Странный',
    'studio.consignArtwork.assetMetadata.field.moods.option.striking': 'Заметный',
    'studio.consignArtwork.assetMetadata.field.moods.option.tragic': 'Трагический',
    'studio.consignArtwork.assetMetadata.field.moods.option.tense': 'Напряженный',
    'studio.consignArtwork.assetMetadata.field.moods.option.vibrant': 'Яркий',
    'studio.consignArtwork.assetMetadata.field.moods.option.violent': 'Жестокий',
    'studio.consignArtwork.assetMetadata.field.moods.option.wonder': 'Чудо',
    'studio.consignArtwork.assetMetadata.field.moods.option.whimsical': 'Капризный',

    'studio.consignArtwork.assetMetadata.field.errors': (data: { message: string }) =>
        `${data.message === 'required' || data.message === 'minItems' ? 'поле обязательно для заполнения' : ''}`,

    /* Licenses */
    'studio.consignArtwork.licenses.title': 'Лицензии',
    'studio.consignArtwork.licenses.description':
        'В настоящее время Vitruveo предлагает четыре способа лицензирования/продажи вашего произведения искусства. Здесь вы можете выбрать любой из этих вариантов лицензирования:',
    'studio.consignArtwork.licenses.oneLicense.error': 'Пожалуйста, добавьте хотя бы одну лицензию',
    'studio.consignArtwork.licenses.fillFields.error': 'Заполните поля правильно.',
    'studio.consignArtwork.licenses.alreadyAdded': 'Лицензия уже добавлена',
    'studio.consignArtwork.licenses.delete.button': 'Удалить',
    'studio.consignArtwork.licenses.add.button': 'Добавить',

    'studio.consignArtwork.licenses.field.checkBoolean': (data: { checkBoolean: unknown }) =>
        `${data.checkBoolean === true ? 'да' : data.checkBoolean === false ? 'нет' : data.checkBoolean}`,
    'studio.consignArtwork.licenses.field.errors': (data: { message: string }) =>
        `${data.message === 'field required' ? 'поле обязательно для заполнения' : ''}`,
    'studio.consignArtwork.licenses.field.stream': 'Потоковая (Stream) v1.0',
    'studio.consignArtwork.licenses.field.print': 'Печать (Print) v1.0',
    'studio.consignArtwork.licenses.field.NFT': 'NFT v1.0',
    'studio.consignArtwork.licenses.field.maximumUnits': 'Максимальное количество единиц',
    'studio.consignArtwork.licenses.field.unitPrice': 'Цена за единицу',
    'studio.consignArtwork.licenses.field.maximumEditions': 'Максимальное количество изданий',
    'studio.consignArtwork.licenses.field.editionPrice': 'Цена издания',
    'studio.consignArtwork.licenses.field.elasticEditions': 'Эластичные издания',

    'studio.consignArtwork.licenses.license': 'Лицензия',

    'studio.consignArtwork.licenses.nft.description':
        'Эта лицензия делает произведение доступным для продажи по одной из нескольких моделей ценообразования. При продаже создается и передается покупателю NFT произведения.',
    'studio.consignArtwork.licenses.nft.enable':
        'Включите эту лицензию, если хотите, чтобы покупатели стали владельцами цифровой коллекции произведения искусства.',

    'studio.consignArtwork.licenses.nft.selectEdition.title': 'Выберите издание',
    'studio.consignArtwork.licenses.nft.selectEdition.elasticEditions':
        'это гибкая модель, предоставляющая покупателю возможность объединять несколько изданий в одно, динамически изменяя размер издания.',
    'studio.consignArtwork.licenses.nft.selectEdition.singleEdition': 'это фиксированная модель 1/1.',
    'studio.consignArtwork.licenses.nft.selectEdition.unlimitedEditions':
        'это плата или бесплатная модель для неограниченных изданий.',

    'studio.consignArtwork.licenses.nft.elasticEditions.title': 'Эластичные издания',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionPrice.title': 'Цена издания (USD)',
    'studio.consignArtwork.licenses.nft.elasticEditions.numberOfEditions.title': 'Количество изданий',
    'studio.consignArtwork.licenses.nft.elasticEditions.totalPrice.title': 'Общая стоимость (USD)',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionDiscount.title': 'Скидка на издание',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionPrice':
        '“Цена издания” - это цена произведения искусства в долларах США.',
    'studio.consignArtwork.licenses.nft.elasticEditions.numberOfEditions':
        '“Количество изданий” - это количество изданий произведения, которые могут быть созданы.',
    'studio.consignArtwork.licenses.nft.elasticEditions.totalPrice':
        '“Общая стоимость” - это “Цена издания” умноженная на “Количество изданий”.',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionDiscount':
        '“Скидка на издание” - это скидка для покупателя при покупке нескольких изданий. Рассчитывается делением 10 на “Количество изданий”. Если включено, скидка применяется к каждому изданию после первого.',
    'studio.consignArtwork.licenses.nft.singleEdition.title': 'Одиночное издание',
    'studio.consignArtwork.licenses.nft.singleEdition.editionPrice':
        '“Цена издания” - это цена произведения искусства в долларах США.',
    'studio.consignArtwork.licenses.nft.singleEdition.editionPrice.title': 'Цена издания (USD)',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.title': 'Неограниченные издания',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.editionPrice':
        '“Цена издания” - это цена произведения искусства в долларах США.',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.editionPrice.title': 'Цена издания (USD)',

    'studio.consignArtwork.licenses.stream.description':
        'Эта лицензия предоставляет произведение для кураторов для включения в плейлисты для потокового воспроизведения искусства на цифровых рамках. Доходы от потокового воспроизведения автоматически рассчитываются на основе использования и согласованных ценовых соглашений.',
    'studio.consignArtwork.licenses.stream.enable':
        'Включите эту лицензию, если хотите, чтобы кураторы включали ваше произведение в плейлисты, используемые потребителями и бизнесом для слайд-шоу на цифровых рамках.',
    'studio.consignArtwork.licenses.stream.enable.description':
        'Доходы от потокового воспроизведения автоматически рассчитываются на основе использования и согласованных ценовых соглашений.',
    'studio.consignArtwork.licenses.stream.unlimitedStreaming': 'Неограниченное потоковое воспроизведение',
    'studio.consignArtwork.licenses.stream.unlimitedStreaming.description':
        'Произведение может использоваться для потокового воспроизведения в неограниченных сценариях.',

    'studio.consignArtwork.licenses.print.description':
        'Эта лицензия предоставляет произведение конечным пользователям для печати на один физический объект с использованием технологии печати по требованию (POD). Лицензия свободно передается до момента печати, после чего она передается исключительно владельцу физического объекта.',
    'studio.consignArtwork.licenses.print.enable':
        'Включите эту лицензию, если хотите, чтобы конечные пользователи использовали ваше искусство для приложений печати по требованию (POD). Эта лицензия предназначена для индивидуальной печати; массовая печать не разрешена.',
    'studio.consignArtwork.licenses.print.singlePrint.title': 'Одиночная печать',
    'studio.consignArtwork.licenses.print.singlePrint.description':
        '“Цена за единицу” - это цена произведения искусства в долларах США за одну печать.',
    'studio.consignArtwork.licenses.print.singlePrint.field': 'Цена за единицу (USD)',

    'studio.consignArtwork.licenses.remix.description':
        'Эта лицензия предоставляет произведение конечным пользователям для использования в приложениях Remix с использованием',
    'studio.consignArtwork.licenses.remix.description2':
        'лицензии, которая разрешает использование Remix в некоммерческих целях.',
    'studio.consignArtwork.licenses.remix.singleRemix.title': 'Одиночный Remix',
    'studio.consignArtwork.licenses.remix.singleRemix.description':
        '“Цена за единицу” - это цена произведения искусства в долларах США за один Remix.',
    'studio.consignArtwork.licenses.remix.singleRemix.field': 'Цена за единицу (USD)',
    'studio.consignArtwork.licenses.remix.enable':
        'Включите эту лицензию, если хотите, чтобы конечные пользователи использовали ваше искусство в приложениях Remix. Результат Remix может использоваться только в некоммерческих целях.',

    /* Terms of Use */
    'studio.consignArtwork.termsOfUse.title': 'Условия использования',
    'studio.consignArtwork.termsOfUse.description':
        'Выполните все необходимые задачи и передайте свое произведение искусства',
    'studio.consignArtwork.termsOfUse.accept.button': (data: { contract: boolean; scrolledToBottom: boolean }) =>
        data.contract ? 'принят' : data.scrolledToBottom ? 'Принять договор' : 'Прокрутите до конца',
    'studio.consignArtwork.termsOfUse.isOriginal':
        'Я подтверждаю, что основной и вспомогательные медиафайлы являются оригинальными, подлинными работами, созданными указанными в метаданных создателями, и не скопированы или украдены (не являются плагиатом) из какого-либо другого источника.',
    'studio.consignArtwork.termsOfUse.generatedArtworkAI':
        'Я подтверждаю, что если какая-либо часть основного и вспомогательных медиафайлов была создана с использованием искусственного интеллекта, я ответил "Да" в поле метаданных "Генерации ИИ".',
    'studio.consignArtwork.termsOfUse.notMintedOtherBlockchain':
        'Я подтверждаю, что это произведение не чеканилось (mint) на любой другой платформе и/или сети, не предлагается, не подано и не выставляется на продажу на любой другой платформе или сети и не будет отчеканено, предложено, подано или выставлено на продажу, пока листинг активен на этой платформе.',

    /* Auxiliary Media */
    'studio.consignArtwork.auxiliaryMedia.description':
        'Загрузите вспомогательные медиа-файлы для съемок за кулисами (BTS) и дополненной реальности (AR).',
    'studio.consignArtwork.auxiliaryMedia.title': 'Вспомогательные медиа-файлы',
    'studio.consignArtwork.auxiliaryMedia.subTitle': 'Медиа-ресурсы вспомогательных файлов',
    'studio.consignArtwork.auxiliaryMedia.arImage.title': 'AR изображение',
    'studio.consignArtwork.auxiliaryMedia.arVideo.title': 'AR видео',
    'studio.consignArtwork.auxiliaryMedia.btsImage.title': 'BTS изображение',
    'studio.consignArtwork.auxiliaryMedia.btsVideo.title': 'BTS видео',
    'studio.consignArtwork.auxiliaryMedia.codeZip.title': 'ZIP-код',

    /* Consignment Status */
    'studio.consignArtwork.consignmentStatus.title': 'Статус передачи',
    'studio.consignArtwork.consignmentStatus.description':
        'Отличная работа! Ваша художественная работа готова к передаче.',
    'studio.consignArtwork.consignmentStatus.message': 'Эта функция будет доступна скоро.',
    'studio.consignArtwork.consignmentStatus.yes': 'Да',
    'studio.consignArtwork.consignmentStatus.no': 'Нет',
    'studio.consignArtwork.consignmentStatus.edit': 'Редактировать',
    'studio.consignArtwork.consignmentStatus.view': 'Просмотр',
    'studio.consignArtwork.consignmentStatus.search': 'Поиск',
    'studio.consignArtwork.consignmentStatus.license': 'Лицензия',

    'studio.consignArtwork.consignmentStatus.draft.title': 'Черновик',
    'studio.consignArtwork.consignmentStatus.preview.title': 'Предпросмотр',
    'studio.consignArtwork.consignmentStatus.activate.title': 'Активировать',

    'studio.consignArtwork.consignmentStatus.activation.title': 'Активация',
    'studio.consignArtwork.consignmentStatus.activation.description':
        'Активация передает ваше произведение искусства на блокчейн и требует кредита создателя.',
    'studio.consignArtwork.consignmentStatus.creatorCreditsRequired': 'Требуемые кредиты создателя',
    'studio.consignArtwork.consignmentStatus.creatorCreditsAvailable': 'Доступные кредиты создателя',
    'studio.consignArtwork.consignmentStatus.viewArtwork.button': 'Просмотреть произведение искусства',

    /* BackModalConfirm */
    'studio.consignArtwork.backModal.title': 'Хотите сохранить информацию?',
    'studio.consignArtwork.backModal.confirm.button': 'Сохранить',
    'studio.consignArtwork.backModal.cancel.button': 'Нет',

    /* Sidebar */
    'studio.sidebar.consign': 'Подать Работу',

    /* Footer */
    'studio.footer.thisStep': 'Этот шаг был',
    'studio.footer.completed': 'Завершено',
    'studio.footer.inProgress': 'В процессе',
    'studio.footer.notYet': 'и еще не завершено',
    'studio.footer.step': 'Шаг',
    'studio.footer.of': 'из',
    'studio.footer.save': 'Сохранить',
    'studio.footer.back': 'Назад',
};

export default language;
