import { Translation } from './types';

const language: Translation = {
    /* Languages */
    'studio.languages.portuguesePTBR': 'Português (pt-BR)',
    'studio.languages.englishUS': 'Inglês (en-US)',
    'studio.languages.spanishES': 'Espanhol (es-ES)',
    'studio.languages.farsiFA': 'Farsi (fa-IR)',
    'studio.languages.russianRU': 'Russo (ru-RU)',

    /* Home */
    'studio.home.wellcome': 'Bem-vindo a',
    'studio.home.title': 'Início',
    'studio.home.transforming':
        'Vitruveo está transformando a arte Web3, e isso significa um software totalmente novo como esta versão "Alpha" do vtruStudio. Alpha significa que o software não está totalmente pronto e você está nos ajudando a testá-lo para que possa ser melhorado.',
    'studio.home.software': 'O software atualmente tem dois recursos que você pode acessar com os botões abaixo:',
    'studio.home.consign': 'Consignar Obra de Arte',
    'studio.home.myProfile': 'Meu Perfil',

    /* User Account */
    'studio.userAccount.title': 'Conta do Usuário',
    'studio.userAccount.creator': 'Criador',
    'studio.userAccount.logout.button': 'Sair',
    'studio.userAccount.menu.title': 'Meu Perfil',
    'studio.userAccount.menu.subtitle': 'Configurações do Usuário',

    /* My Profile */
    'studio.myProfile.title': 'Meu Perfil',
    'studio.myProfile.subtitle': 'Personalize seu perfil Vitruveo com vários emails e endereços de carteira.',
    'studio.myProfile.home': 'Início',
    'studio.myProfile.saveMessage': 'Dados salvos com sucesso',
    'studio.myProfile.accessConsignMessage':
        'Para acessar a consignação de obras de arte, é necessário preencher todos os campos obrigatórios no perfil do usuário',
    'studio.myProfile.form.username.title': 'Nome de usuário',
    'studio.myProfile.form.username.placeholder': 'Digite o nome de usuário',
    'studio.myProfile.form.usernameRequired.error': 'Nome de usuário é obrigatório',
    'studio.myProfile.form.profile.title': 'Altere sua foto de perfil a partir daqui',
    'studio.myProfile.form.profile.reset.button': 'Redefinir',
    'studio.myProfile.form.profile.upload.button': 'Upload',
    'studio.myProfile.form.profile.description': 'Permitido JPG, GIF ou PNG. Tamanho máximo de 800KB',
    'studio.myProfile.form.emails.title': 'Emails',
    'studio.myProfile.form.emailsExists.error': 'Email já existe',
    'studio.myProfile.form.addEmails.placeholder': 'Digite um endereço de e-mail adicional',
    'studio.myProfile.form.code.placeholder': 'digite um código...',
    'studio.myProfile.form.verify.button': 'Verificar',
    'studio.myProfile.form.delete.button': 'Excluir',
    'studio.myProfile.form.wallets.title': 'Carteiras',
    'studio.myProfile.verificationCodeSentMessageSuccess': 'código de verificação enviado para o email',
    'studio.myProfile.verificationCodeSentMessageError': 'erro ao enviar código de verificação para o email',
    'studio.myProfile.emailVerificationMessageSuccess': 'email verificado',
    'studio.myProfile.emailVerificationMessageError': 'erro ao verificar o código',
    'studio.myProfile.form.wallet.placeholderAdded': 'Conectar carteira adicional',
    'studio.myProfile.form.wallet.placeholder': 'Conectar nova carteira',
    'studio.myProfile.form.connect.button': 'Conectar',

    /* Consign Artwork */
    'studio.consignArtwork.form.next.button': 'Próximo',
    'studio.consignArtwork.title': 'Consignar Obra de Arte',
    'studio.consignArtwork.subtitle': 'Complete todas as tarefas necessárias e consigne sua obra de arte',

    'studio.consignArtwork.stepName.assetMedia': 'Mídia de Ativo',
    'studio.consignArtwork.stepName.assetMetadata': 'Metadados do Ativo',
    'studio.consignArtwork.stepName.licenses': 'Licenças',
    'studio.consignArtwork.stepName.termsOfUse': 'Termos de Uso',
    'studio.consignArtwork.stepName.auxiliaryMedia': 'Mídia Auxiliar',
    'studio.consignArtwork.optional': 'opcional',

    'studio.consignArtwork.stepStatus.completed': 'Concluído',
    'studio.consignArtwork.stepStatus.inProgress': 'Em Andamento',
    'studio.consignArtwork.stepStatus.notStarted': 'Não Iniciado',
    'studio.consignArtwork.stepStatus.error': 'Erro',
    'studio.consignArtwork.stepPublishMessageSuccess': 'Consignado com sucesso!',

    'studio.consignArtwork.stepButton': (data: { status: string }) =>
        `${data.status !== 'notStarted' ? 'Editar' : 'Iniciar'}`,

    'studio.consignArtwork.publishButton': (data: { status: string }) =>
        `${data.status === 'published' ? 'Consignado' : 'Consignar'}`,

    /* Asset Media */
    'studio.consignArtwork.assetMedia.title': 'Mídia do Ativo',
    'studio.consignArtwork.assetMedia.description':
        'Faça upload dos arquivos de mídia para a obra de arte sendo consignada.',
    'studio.consignArtwork.assetMedia.differentUses': 'FAZER UPLOAD/CRIAR VARIAÇÕES PARA USOS DIFERENTES',
    'studio.consignArtwork.assetMedia.amazing':
        'Ficou incrível! Para que sua obra de arte pareça ótima em diferentes dispositivos, precisamos de algumas variações adicionais.',
    'studio.consignArtwork.assetMedia.haveCreated':
        'Se você criou seus próprios arquivos para as variações abaixo, basta fazer o upload de cada um aqui.',
    'studio.consignArtwork.assetMedia.haveNotCreated':
        'Se você não criou seus próprios arquivos, não se preocupe, faça o upload do seu arquivo original novamente para cada variação necessária e nós ajudaremos a recortar seu arquivo aqui mesmo.',
    'studio.consignArtwork.assetMedia.previewHelp':
        'O arquivo de visualização será um clipe de cinco segundos da sua obra de arte. Você pode fazer upload de um que tenha criado você mesmo ou simplesmente fazer upload do seu arquivo original, e nós ajudaremos a criar esse clipe aqui.',
    'studio.consignArtwork.assetMedia.upload.button': 'Upload',
    'studio.consignArtwork.assetMedia.assets': 'Arquivos de Mídia',

    'studio.consignArtwork.assetMedia.definition': (data: { definition: 'landscape' | 'square' | 'portrait' }) => {
        return `${
            data.definition === 'landscape' ? 'Paisagem' : data.definition === 'portrait' ? 'Retrato' : 'Quadrado'
        }`;
    },
    'studio.consignArtwork.assetMedia.image': 'imagem',
    'studio.consignArtwork.assetMedia.max': (data: { seconds: number }) =>
        `${data.seconds ? `máx / ${data.seconds} segundos` : 'máx.'}`,

    'studio.consignArtwork.assetMedia.mediaRequired': (data: { required: boolean }) =>
        `${data.required ? 'Obrigatório' : 'Opcional'}`,

    'studio.consignArtwork.assetMedia.mediaIs': 'Esta mídia é',
    'studio.consignArtwork.assetMedia.cropModal.title': (data: { width: string; height: string }) =>
        `Corte a mídia para exibição em ${data.width} x ${data.height} pixels. Clique em “Concluído” para salvar.`,

    'studio.consignArtwork.assetMedia.formats': (data: {
        format: 'original' | 'display' | 'exhibition' | 'preview' | 'print';
    }) => {
        if (data.format === 'original') return 'Original';
        if (data.format === 'display') return 'Exibição';
        if (data.format === 'exhibition') return 'Exposição';
        if (data.format === 'preview') return 'Pré-visualização';
        if (data.format === 'print') return 'Impressão';
        return '';
    },

    'studio.consignArtwork.assetMedia.modalError.title':
        'Uh oh! O arquivo de mídia que você fez upload tem os seguintes problemas:',
    'studio.consignArtwork.assetMedia.modalErrorDimensions.title': 'Dimensões',
    'studio.consignArtwork.assetMedia.modalErrorDimensions.description': (data: {
        definition: string;
        format: string;
        width: string;
        height: string;
    }) =>
        `— O arquivo de mídia para uma Imagem ${data.definition} (${data.format}) deve ter pelo menos ${data.width} x ${data.height} pixels`,

    'studio.consignArtwork.assetMedia.modalErrorSize.title': 'Tamanho',
    'studio.consignArtwork.assetMedia.modalErrorSize.description': (data: {
        definition: string;
        format: string;
        sizeError: string;
    }) =>
        `— O tamanho do arquivo de mídia para uma Imagem ${data.definition} (${data.format}) não pode exceder ${data.sizeError}`,

    'studio.consignArtwork.assetMedia.dragAndDrop': 'ENVIO DE OBRA DE ARTE ORIGINAL',
    'studio.consignArtwork.assetMedia.dragAndDrop.description':
        'Para enviar sua obra de arte original, arraste e solte seu arquivo aqui ou clique para selecionar o arquivo em seu computador.',
    'studio.consignArtwork.assetMedia.imageTypes': 'Imagem: JPEG, PNG, GIF, SVG, WEBP',
    'studio.consignArtwork.assetMedia.videoTypes': 'Vídeo: MP4, WEBM',

    /* Asset Metadata */
    'studio.consignArtwork.assetMetadata.title': 'Metadados do Ativo',
    'studio.consignArtwork.assetMetadata.description': 'Todos os Metadados do Ativo são visíveis para o público.',
    'studio.consignArtwork.assetMetadata.section.context': 'Contexto',
    'studio.consignArtwork.assetMetadata.section.taxonomy': 'Taxonomia',
    'studio.consignArtwork.assetMetadata.section.creators': 'Criadores',
    'studio.consignArtwork.assetMetadata.section.provenance': 'Procedência',
    'studio.consignArtwork.assetMetadata.section.custom': 'Personalizado',
    'studio.consignArtwork.assetMetadata.section.assets': 'Ativos',

    'studio.consignArtwork.assetMetadata.field.title': 'Título',
    'studio.consignArtwork.assetMetadata.field.title.placeholder': 'Título da obra',
    'studio.consignArtwork.assetMetadata.field.description': 'Descrição',
    'studio.consignArtwork.assetMetadata.field.description.placeholder': 'Breve descrição da obra',
    'studio.consignArtwork.assetMetadata.field.tag': 'Tag',
    'studio.consignArtwork.assetMetadata.field.tag.placeholder': 'Tags relevantes para a obra',
    'studio.consignArtwork.assetMetadata.field.moods': 'Humores',
    'studio.consignArtwork.assetMetadata.field.moods.placeholder': 'Sentimentos evocados pela obra',
    'studio.consignArtwork.assetMetadata.field.moods.option.admiration': 'Admiração',
    'studio.consignArtwork.assetMetadata.field.moods.option.absorbing': 'Absorvente',
    'studio.consignArtwork.assetMetadata.field.moods.option.amusement': 'Diversão',
    'studio.consignArtwork.assetMetadata.field.moods.option.adoration': 'Adoração',
    'studio.consignArtwork.assetMetadata.field.moods.option.awe': 'Awe',
    'studio.consignArtwork.assetMetadata.field.moods.option.anxiety': 'Ansiedade',
    'studio.consignArtwork.assetMetadata.field.moods.option.boredom': 'Tédio',
    'studio.consignArtwork.assetMetadata.field.moods.option.brooding': 'Pensativo',
    'studio.consignArtwork.assetMetadata.field.moods.option.calmness': 'Calma',
    'studio.consignArtwork.assetMetadata.field.moods.option.chills': 'Arrepios',
    'studio.consignArtwork.assetMetadata.field.moods.option.chaotic': 'Caótico',
    'studio.consignArtwork.assetMetadata.field.moods.option.connectedness': 'Conexão',
    'studio.consignArtwork.assetMetadata.field.moods.option.cosmic': 'Cósmico',
    'studio.consignArtwork.assetMetadata.field.moods.option.confusion': 'Confusão',
    'studio.consignArtwork.assetMetadata.field.moods.option.dread': 'Pavor',
    'studio.consignArtwork.assetMetadata.field.moods.option.distaste': 'Desagrado',
    'studio.consignArtwork.assetMetadata.field.moods.option.disgust': 'Nojo',
    'studio.consignArtwork.assetMetadata.field.moods.option.dreary': 'Monótono',
    'studio.consignArtwork.assetMetadata.field.moods.option.disorienting': 'Desorientador',
    'studio.consignArtwork.assetMetadata.field.moods.option.dreamy': 'Sonhador',
    'studio.consignArtwork.assetMetadata.field.moods.option.desire': 'Desejo',
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
    'studio.consignArtwork.assetMetadata.field.moods.option.serenity': 'Serenidade',
    'studio.consignArtwork.assetMetadata.field.moods.option.sadness': 'Tristeza',
    'studio.consignArtwork.assetMetadata.field.moods.option.sensual': 'Sensual',
    'studio.consignArtwork.assetMetadata.field.moods.option.spiritual': 'Espiritual',
    'studio.consignArtwork.assetMetadata.field.moods.option.strange': 'Estranho',
    'studio.consignArtwork.assetMetadata.field.moods.option.striking': 'Impressionante',
    'studio.consignArtwork.assetMetadata.field.moods.option.tragic': 'Trágico',
    'studio.consignArtwork.assetMetadata.field.moods.option.tense': 'Tenso',
    'studio.consignArtwork.assetMetadata.field.moods.option.vibrant': 'Vibrante',
    'studio.consignArtwork.assetMetadata.field.moods.option.violent': 'Violento',
    'studio.consignArtwork.assetMetadata.field.moods.option.wonder': 'Maravilha',
    'studio.consignArtwork.assetMetadata.field.moods.option.whimsical': 'Whimsical',

    'studio.consignArtwork.assetMetadata.field.errors': (data: { message: string }) =>
        `${data.message === 'required' || data.message === 'minItems' ? 'Campo obrigatório' : ''}`,

    /* Licenças */
    'studio.consignArtwork.licenses.title': 'Licenças',
    'studio.consignArtwork.licenses.description':
        'Atualmente, a Vitruveo oferece quatro formas de licenciar/vender sua obra de arte. Aqui você pode escolher qualquer uma dessas opções de licenciamento:',
    'studio.consignArtwork.licenses.oneLicense.error': 'Por favor, adicione pelo menos uma licença',
    'studio.consignArtwork.licenses.fillFields.error': 'Preencha os campos corretamente.',
    'studio.consignArtwork.licenses.alreadyAdded': 'Licença já adicionada',
    'studio.consignArtwork.licenses.delete.button': 'Deletar',
    'studio.consignArtwork.licenses.add.button': 'Adicionar',

    'studio.consignArtwork.licenses.field.checkBoolean': (data: { checkBoolean: unknown }) =>
        `${data.checkBoolean === true ? 'sim' : data.checkBoolean === false ? 'não' : data.checkBoolean}`,
    'studio.consignArtwork.licenses.field.errors': (data: { message: string }) =>
        `${data.message === 'field required' ? 'campo obrigatório' : ''}`,
    'studio.consignArtwork.licenses.field.stream': 'Stream v1.0',
    'studio.consignArtwork.licenses.field.print': 'Print v1.0',
    'studio.consignArtwork.licenses.field.NFT': 'NFT v1.0',
    'studio.consignArtwork.licenses.field.maximumUnits': 'Unidades Máximas',
    'studio.consignArtwork.licenses.field.unitPrice': 'Preço Unitário',
    'studio.consignArtwork.licenses.field.maximumEditions': 'Edições Máximas',
    'studio.consignArtwork.licenses.field.editionPrice': 'Preço da Edição',
    'studio.consignArtwork.licenses.field.elasticEditions': 'Edições Elásticas',

    'studio.consignArtwork.licenses.license': 'Licença',

    'studio.consignArtwork.licenses.nft.description':
        'Esta licença torna a obra de arte disponível para venda sob um dos vários modelos de precificação de edição. Quando vendido, um NFT da obra de arte é cunhado e entregue ao comprador.',
    'studio.consignArtwork.licenses.nft.enable':
        'Ative esta licença se você deseja que os compradores tenham a propriedade de um colecionável digital da obra de arte.',

    'studio.consignArtwork.licenses.nft.selectEdition.title': 'Selecionar Edição',
    'studio.consignArtwork.licenses.nft.selectEdition.elasticEditions':
        'é um modelo flexível que dá ao comprador a capacidade de combinar várias edições em uma, alterando dinamicamente o tamanho da edição.',
    'studio.consignArtwork.licenses.nft.selectEdition.singleEdition': 'é um modelo fixo 1/1.',
    'studio.consignArtwork.licenses.nft.selectEdition.unlimitedEditions':
        'é um modelo gratuito ou com taxa para edições ilimitadas.',

    'studio.consignArtwork.licenses.nft.elasticEditions.title': 'Edições Elásticas',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionPrice.title': 'Preço da Edição (USD)',
    'studio.consignArtwork.licenses.nft.elasticEditions.numberOfEditions.title': 'Número de Edições',
    'studio.consignArtwork.licenses.nft.elasticEditions.totalPrice.title': 'Preço Total (USD)',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionDiscount.title': 'Desconto da Edição',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionPrice':
        '“Preço da Edição” é o preço da obra de arte em dólares americanos.',
    'studio.consignArtwork.licenses.nft.elasticEditions.numberOfEditions':
        '“Número de Edições” é a quantidade de edições da obra de arte que podem ser cunhadas.',
    'studio.consignArtwork.licenses.nft.elasticEditions.totalPrice':
        '“Preço Total” é o “Preço da Edição” multiplicado pelo “Número de Edições.”',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionDiscount':
        '“Desconto da Edição” é o desconto para o comprador ao comprar várias edições. É calculado dividindo 10 pelo “Número de Edições.” Se ativado, o desconto é aplicado para cada edição após a primeira.',
    'studio.consignArtwork.licenses.nft.singleEdition.title': 'Edição Única',
    'studio.consignArtwork.licenses.nft.singleEdition.editionPrice':
        '“Preço da Edição” é o preço da obra de arte em dólares americanos.',
    'studio.consignArtwork.licenses.nft.singleEdition.editionPrice.title': 'Preço da Edição (USD)',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.title': 'Edições Ilimitadas',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.editionPrice':
        '“Preço da Edição” é o preço da obra de arte em dólares americanos.',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.editionPrice.title': 'Preço da Edição (USD)',

    'studio.consignArtwork.licenses.stream.description':
        'Esta licença torna a obra de arte disponível para curadores para inclusão em playlists para transmissão de arte para quadros digitais. Os ganhos com a transmissão são calculados automaticamente com base no uso e nos acordos de preço negociados.',
    'studio.consignArtwork.licenses.stream.enable':
        'Ative esta licença se você deseja que os curadores incluam sua obra de arte em playlists que são usadas por consumidores e empresas para apresentações de slides em quadros digitais.',
    'studio.consignArtwork.licenses.stream.enable.description':
        'Os ganhos com a transmissão são calculados automaticamente com base no uso e nos acordos de preço negociados.',
    'studio.consignArtwork.licenses.stream.unlimitedStreaming': 'Transmissão Ilimitada',
    'studio.consignArtwork.licenses.stream.unlimitedStreaming.description':
        'A obra de arte pode ser usada para transmissão em cenários ilimitados.',

    'studio.consignArtwork.licenses.print.description':
        'Esta licença torna a obra de arte disponível para os usuários finais para impressão em um único item físico usando a tecnologia Print-on-Demand (POD). A licença é livremente transferível até o ponto de impressão, após o qual é transferível apenas para o proprietário do item físico.',
    'studio.consignArtwork.licenses.print.enable':
        'Ative esta licença se você deseja que os usuários finais usem sua arte para aplicações de impressão sob demanda (POD). Esta licença é para impressão individual; a impressão em massa não é permitida.',
    'studio.consignArtwork.licenses.print.singlePrint.title': 'Impressão Única',
    'studio.consignArtwork.licenses.print.singlePrint.description':
        '“Preço Unitário” é o preço da obra de arte em dólares americanos para uma única impressão.',
    'studio.consignArtwork.licenses.print.singlePrint.field': 'Preço Unitário (USD)',

    'studio.consignArtwork.licenses.remix.description':
        'Esta licença torna a obra de arte disponível para os usuários finais para uso em aplicações Remix usando a',
    'studio.consignArtwork.licenses.remix.description2': 'licença que permite o uso de remix para fins não comerciais.',
    'studio.consignArtwork.licenses.remix.singleRemix.title': 'Remix Único',
    'studio.consignArtwork.licenses.remix.singleRemix.description':
        '“Preço Unitário” é o preço da obra de arte em dólares americanos para um único remix.',
    'studio.consignArtwork.licenses.remix.singleRemix.field': 'Preço Unitário (USD)',
    'studio.consignArtwork.licenses.remix.enable':
        'Ative esta licença se você deseja que os usuários finais usem sua arte em aplicações Remix. O output do remix só pode ser usado para fins não comerciais.',

    /* Termos de Uso */
    'studio.consignArtwork.termsOfUse.title': 'Termos de Uso',
    'studio.consignArtwork.termsOfUse.description': 'Complete todas as tarefas necessárias e consigne sua obra de arte',
    'studio.consignArtwork.termsOfUse.accept.button': (data: { contract: boolean; scrolledToBottom: boolean }) =>
        data.contract ? 'Aceito' : data.scrolledToBottom ? 'Aceitar Contrato' : 'Role até o final',
    'studio.consignArtwork.termsOfUse.isOriginal':
        'Eu concordo que o Ativo e os arquivos de Mídia Auxiliar são obras originais e autênticas que foram criadas pelos criadores indicados na submissão de metadados e não foram copiados, roubados ou plagiados de qualquer outra fonte.',
    'studio.consignArtwork.termsOfUse.generatedArtworkAI':
        'Eu concordo que se qualquer parte do Ativo e dos arquivos de Mídia Auxiliar foram criados usando Inteligência Artificial, eu respondi "Sim" no campo de Metadados para "Geração por IA".',
    'studio.consignArtwork.termsOfUse.notMintedOtherBlockchain':
        'Eu concordo que esta obra não está cunhada em qualquer outra blockchain, oferecida, consignada ou listada para venda em qualquer outra plataforma, e não será cunhada, oferecida, consignada ou listada enquanto a listagem estiver ativa nesta plataforma.',

    /* Auxiliary Media */
    'studio.consignArtwork.auxiliaryMedia.description':
        'Faça upload de ativos de mídia auxiliares para Bastidores (BTS) e Realidade Aumentada (AR).',
    'studio.consignArtwork.auxiliaryMedia.title': 'Mídia Auxiliar',
    'studio.consignArtwork.auxiliaryMedia.subTitle': 'Ativos de Mídia Auxiliar',
    'studio.consignArtwork.auxiliaryMedia.arImage.title': 'Imagem AR',
    'studio.consignArtwork.auxiliaryMedia.arVideo.title': 'Vídeo AR',
    'studio.consignArtwork.auxiliaryMedia.btsImage.title': 'Imagem BTS',
    'studio.consignArtwork.auxiliaryMedia.btsVideo.title': 'Vídeo BTS',
    'studio.consignArtwork.auxiliaryMedia.codeZip.title': 'Código Zip',

    /* Consignment Status */
    'studio.consignArtwork.consignmentStatus.title': 'Status de Consignação',
    'studio.consignArtwork.consignmentStatus.description':
        'Bom trabalho! Sua obra de arte está pronta para consignação.',
    'studio.consignArtwork.consignmentStatus.message': 'Esta funcionalidade estará disponível em breve.',
    'studio.consignArtwork.consignmentStatus.yes': 'Sim',
    'studio.consignArtwork.consignmentStatus.no': 'Não',
    'studio.consignArtwork.consignmentStatus.edit': 'Editar',
    'studio.consignArtwork.consignmentStatus.view': 'Visualizar',
    'studio.consignArtwork.consignmentStatus.search': 'Buscar',
    'studio.consignArtwork.consignmentStatus.license': 'Licença',
    'studio.consignArtwork.consignmentStatus.draft.title': 'Rascunho',
    'studio.consignArtwork.consignmentStatus.preview.title': 'Prévia',
    'studio.consignArtwork.consignmentStatus.activate.title': 'Ativar',

    'studio.consignArtwork.consignmentStatus.activation.title': 'Ativação',
    'studio.consignArtwork.consignmentStatus.activation.description':
        'A ativação consigna sua obra de arte à blockchain e requer um Crédito de Criador.',
    'studio.consignArtwork.consignmentStatus.creatorCreditsRequired': 'Créditos de Criador Necessários',
    'studio.consignArtwork.consignmentStatus.creatorCreditsAvailable': 'Créditos de Criador Disponíveis',
    'studio.consignArtwork.consignmentStatus.viewArtwork.button': 'Visualizar Obra de Arte',

    /* BackModalConfirm */
    'studio.consignArtwork.backModal.title': 'Gostaria de salvar as informações?',
    'studio.consignArtwork.backModal.confirm.button': 'Salvar',
    'studio.consignArtwork.backModal.cancel.button': 'Não',

    /* Sidebar */
    'studio.sidebar.consign': 'Consignar Obra de Arte',

    /* Footer */
    'studio.footer.thisStep': 'Esta etapa está',
    'studio.footer.completed': 'Concluída',
    'studio.footer.inProgress': 'Em progresso',
    'studio.footer.notYet': 'e ainda não está completa',
    'studio.footer.step': 'Etapa',
    'studio.footer.of': 'de',
    'studio.footer.save': 'Salvar',
    'studio.footer.back': 'Voltar',
};

export default language;
