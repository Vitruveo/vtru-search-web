import { Translation } from './types';

const language: Translation = {
    /* Login */

    /* Languages */
    'studio.languages.portuguesePTBR': 'Portuguese (pt-BR)',
    'studio.languages.englishUS': 'English (en-US)',
    'studio.languages.spanishES': 'Spanish (es-ES)',
    'studio.languages.farsiFA': 'Farsi (fa-IR)',
    'studio.languages.russianRU': 'Russian (ru-RU)',

    /* Home */
    'studio.home.wellcome': 'Wellcome to',
    'studio.home.title': 'Home',
    'studio.home.transforming':
        'Vitruveo is transforming Web3 art, and that means all-new software like this “Alpha” version of vtruStudio. Alpha means the software is not fully ready and you’re helping us test it so it can be improved.',
    'studio.home.software': 'The software currently has two features you can access with the buttons below:',
    'studio.home.consign': 'Consign Artwork',
    'studio.home.myProfile': 'My Profile',

    /* User Account */
    'studio.userAccount.title': 'User Account',
    'studio.userAccount.creator': 'Creator',
    'studio.userAccount.logout.button': 'Logout',
    'studio.userAccount.menu.title': 'My Profile',
    'studio.userAccount.menu.subtitle': 'User Settings',

    /* My Profile */
    'studio.myProfile.title': 'My Profile',
    'studio.myProfile.subtitle': 'Customize your Vitruveo profile with multiple email and wallet addresses.',
    'studio.myProfile.home': 'Home',
    'studio.myProfile.saveMessage': 'Data saved successfully',
    'studio.myProfile.accessConsignMessage':
        'To access the consign artwork, it is necessary to fill in all the mandatory fields in the user profile',
    'studio.myProfile.form.username.title': 'Username',
    'studio.myProfile.form.username.placeholder': 'Enter username',
    'studio.myProfile.form.usernameRequired.error': 'Username is required',
    'studio.myProfile.form.profile.title': 'Change your profile picture from here',
    'studio.myProfile.form.profile.reset.button': 'Reset',
    'studio.myProfile.form.profile.upload.button': 'Upload',
    'studio.myProfile.form.profile.description': 'Allowed JPG, GIF or PNG. Max size of 800KB',
    'studio.myProfile.form.emails.title': 'Emails',
    'studio.myProfile.form.emailsExists.error': 'Email already exists',
    'studio.myProfile.form.addEmails.placeholder': 'Enter additional email address',
    'studio.myProfile.form.code.placeholder': 'type a code...',
    'studio.myProfile.form.verify.button': 'Verify',
    'studio.myProfile.form.delete.button': 'Delete',
    'studio.myProfile.form.wallets.title': 'Wallets',
    'studio.myProfile.verificationCodeSentMessageSuccess': 'verification code sent to email',
    'studio.myProfile.verificationCodeSentMessageError': 'error sending verification code to email',
    'studio.myProfile.emailVerificationMessageSuccess': 'email verified',
    'studio.myProfile.emailVerificationMessageError': 'error verifying code',
    'studio.myProfile.form.wallet.placeholderAdded': 'Connect additional wallet',
    'studio.myProfile.form.wallet.placeholder': 'Connect new wallet',
    'studio.myProfile.form.connect.button': 'Connect',

    /* Consign Artwork */
    'studio.consignArtwork.form.next.button': 'Next',
    'studio.consignArtwork.title': 'Consign Artwork',
    'studio.consignArtwork.subtitle': 'Complete all required tasks and consign your artwork',

    'studio.consignArtwork.stepName.assetMedia': 'Asset Media',
    'studio.consignArtwork.stepName.assetMetadata': 'Asset Metadata',
    'studio.consignArtwork.stepName.licenses': 'Licenses',
    'studio.consignArtwork.stepName.termsOfUse': 'Terms of Use',
    'studio.consignArtwork.stepName.auxiliaryMedia': 'Auxiliary Media',
    'studio.consignArtwork.optional': 'optional',

    'studio.consignArtwork.stepStatus.completed': 'Completed',
    'studio.consignArtwork.stepStatus.inProgress': 'In Progress',
    'studio.consignArtwork.stepStatus.notStarted': 'Not Started',
    'studio.consignArtwork.stepStatus.error': 'Error',
    'studio.consignArtwork.stepPublishMessageSuccess': 'Published successfully!',

    'studio.consignArtwork.stepButton': (data: { status: string }) =>
        `${data.status !== 'notStarted' ? 'Edit' : 'Start'}`,

    'studio.consignArtwork.publishButton': (data: { status: string }) =>
        `${data.status === 'published' ? 'Consigned' : 'Consign'}`,

    /* Asset Media */
    'studio.consignArtwork.assetMedia.title': 'Asset Media',
    'studio.consignArtwork.assetMedia.description': 'Upload media assets for the artwork being consigned.',
    'studio.consignArtwork.assetMedia.differentUses': 'UPLOAD/CREATE VARIATIONS FOR DIFFERENT USES',
    'studio.consignArtwork.assetMedia.amazing':
        'Looks amazing! For your artwork to look great on different devices, we need a few more variations.',
    'studio.consignArtwork.assetMedia.haveCreated':
        'If you have created your own files for the variations below, simply upload each one here.',
    'studio.consignArtwork.assetMedia.haveNotCreated':
        'If you have not created your own files don’t worry, just upload your original file again for each required variation and we’ll help you crop your file right here.',
    'studio.consignArtwork.assetMedia.previewHelp':
        'Preview file will be a five second clip of your artwork. You can upload one you’ve created yourself or just upload your original file and we’ll help you create that clip here.',
    'studio.consignArtwork.assetMedia.upload.button': 'Upload',
    'studio.consignArtwork.assetMedia.assets': 'Media Assets',
    'studio.consignArtwork.assetMedia.definition': (data: { definition: 'landscape' | 'square' | 'portrait' }) => {
        return `${
            data.definition === 'landscape' ? 'Landscape' : data.definition === 'portrait' ? 'Portrait' : 'Square'
        }`;
    },
    'studio.consignArtwork.assetMedia.image': 'Image',
    'studio.consignArtwork.assetMedia.video': 'Video',
    'studio.consignArtwork.assetMedia.max': (data: { seconds: number }) =>
        `${data.seconds ? `max / ${data.seconds} seconds` : 'maximum'}`,

    'studio.consignArtwork.assetMedia.mediaRequired': (data: { required: boolean }) =>
        `${data.required ? 'Required' : 'Optional'}`,

    'studio.consignArtwork.assetMedia.mediaIs': 'This media is',
    'studio.consignArtwork.assetMedia.cropModal.title': (data: { width: string; height: string }) =>
        `Crop media for Display to ${data.width} x ${data.height} pixels. Click “Done” to save.`,

    'studio.consignArtwork.assetMedia.formats': (data: {
        format: 'original' | 'display' | 'exhibition' | 'preview' | 'print';
    }) => {
        if (data.format === 'original') return 'Original';
        if (data.format === 'display') return 'Display';
        if (data.format === 'exhibition') return 'Exhibition';
        if (data.format === 'preview') return 'Preview';
        if (data.format === 'print') return 'Print';
        return '';
    },

    'studio.consignArtwork.assetMedia.modalError.title': 'Uh oh! The media file you uploaded has the following issues:',
    'studio.consignArtwork.assetMedia.modalErrorDimensions.title': 'Dimensions',
    'studio.consignArtwork.assetMedia.modalErrorDimensions.description': (data: {
        definition: string;
        format: string;
        width: string;
        height: string;
    }) =>
        `— The media file for a ${data.definition} Image (${data.format}) must be at least ${data.width} x ${data.height} pixels`,

    'studio.consignArtwork.assetMedia.modalErrorSize.title': 'Size',
    'studio.consignArtwork.assetMedia.modalErrorSize.description': (data: {
        definition: string;
        format: string;
        sizeError: string;
    }) => `— The media file size for a ${data.definition} Image (${data.format}) cannot exceed ${data.sizeError}`,

    'studio.consignArtwork.assetMedia.dragAndDrop': 'ORIGINAL ARTWORK UPLOAD',
    'studio.consignArtwork.assetMedia.dragAndDrop.description':
        'To upload your original artwork, drag and drop your file here or click to select your file from your computer.',
    'studio.consignArtwork.assetMedia.imageTypes': 'Image: JPEG, PNG, GIF, SVG, WEBP',
    'studio.consignArtwork.assetMedia.videoTypes': 'Video: MP4, WEBM',

    /* Asset Metadata */
    'studio.consignArtwork.assetMetadata.title': 'Asset Metadata',
    'studio.consignArtwork.assetMetadata.description': 'All Asset Metadata is viewable to the public.',
    'studio.consignArtwork.assetMetadata.section.context': 'Context',
    'studio.consignArtwork.assetMetadata.section.taxonomy': 'Taxonomy',
    'studio.consignArtwork.assetMetadata.section.creators': 'Creators',
    'studio.consignArtwork.assetMetadata.section.provenance': 'Provenance',
    'studio.consignArtwork.assetMetadata.section.custom': 'Custom',
    'studio.consignArtwork.assetMetadata.section.assets': 'Assets',

    'studio.consignArtwork.assetMetadata.field.title': 'Title',
    'studio.consignArtwork.assetMetadata.field.title.placeholder': 'Title of work',
    'studio.consignArtwork.assetMetadata.field.description': 'Description',
    'studio.consignArtwork.assetMetadata.field.description.placeholder': 'Brief description of work',
    'studio.consignArtwork.assetMetadata.field.tag': 'Tag',
    'studio.consignArtwork.assetMetadata.field.tag.placeholder': 'Tags relevant to the work',
    'studio.consignArtwork.assetMetadata.field.moods': 'Moods',
    'studio.consignArtwork.assetMetadata.field.moods.placeholder': 'Feelings that the work evokes',
    'studio.consignArtwork.assetMetadata.field.moods.option.admiration': 'Admiration',
    'studio.consignArtwork.assetMetadata.field.moods.option.absorbing': 'Absorbing',
    'studio.consignArtwork.assetMetadata.field.moods.option.amusement': 'Amusement',
    'studio.consignArtwork.assetMetadata.field.moods.option.adoration': 'Adoration',
    'studio.consignArtwork.assetMetadata.field.moods.option.awe': 'Awe',
    'studio.consignArtwork.assetMetadata.field.moods.option.anxiety': 'Anxiety',
    'studio.consignArtwork.assetMetadata.field.moods.option.boredom': 'Boredom',
    'studio.consignArtwork.assetMetadata.field.moods.option.brooding': 'Brooding',
    'studio.consignArtwork.assetMetadata.field.moods.option.calmness': 'Calmness',
    'studio.consignArtwork.assetMetadata.field.moods.option.chills': 'Chills',
    'studio.consignArtwork.assetMetadata.field.moods.option.chaotic': 'Chaotic',
    'studio.consignArtwork.assetMetadata.field.moods.option.connectedness': 'Connectedness',
    'studio.consignArtwork.assetMetadata.field.moods.option.cosmic': 'Cosmic',
    'studio.consignArtwork.assetMetadata.field.moods.option.confusion': 'Confusion',
    'studio.consignArtwork.assetMetadata.field.moods.option.dread': 'Dread',
    'studio.consignArtwork.assetMetadata.field.moods.option.distaste': 'Distaste',
    'studio.consignArtwork.assetMetadata.field.moods.option.disgust': 'Disgust',
    'studio.consignArtwork.assetMetadata.field.moods.option.dreary': 'Dreary',
    'studio.consignArtwork.assetMetadata.field.moods.option.disorienting': 'Disorienting',
    'studio.consignArtwork.assetMetadata.field.moods.option.dreamy': 'Dreamy',
    'studio.consignArtwork.assetMetadata.field.moods.option.desire': 'Desire',
    'studio.consignArtwork.assetMetadata.field.moods.option.elegant': 'Elegant',
    'studio.consignArtwork.assetMetadata.field.moods.option.humorous': 'Humorous',
    'studio.consignArtwork.assetMetadata.field.moods.option.intimate': 'Intimate',
    'studio.consignArtwork.assetMetadata.field.moods.option.intricate': 'Intricate',
    'studio.consignArtwork.assetMetadata.field.moods.option.love': 'Love',
    'studio.consignArtwork.assetMetadata.field.moods.option.lively': 'Lively',
    'studio.consignArtwork.assetMetadata.field.moods.option.mystical': 'Mystical',
    'studio.consignArtwork.assetMetadata.field.moods.option.mysterious': 'Mysterious',
    'studio.consignArtwork.assetMetadata.field.moods.option.nostalgia': 'Nostalgia',
    'studio.consignArtwork.assetMetadata.field.moods.option.ornate': 'Ornate',
    'studio.consignArtwork.assetMetadata.field.moods.option.psychedelic': 'Psychedelic',
    'studio.consignArtwork.assetMetadata.field.moods.option.serenity': 'Serenity',
    'studio.consignArtwork.assetMetadata.field.moods.option.sadness': 'Sadness',
    'studio.consignArtwork.assetMetadata.field.moods.option.sensual': 'Sensual',
    'studio.consignArtwork.assetMetadata.field.moods.option.spiritual': 'Spiritual',
    'studio.consignArtwork.assetMetadata.field.moods.option.strange': 'Strange',
    'studio.consignArtwork.assetMetadata.field.moods.option.striking': 'Striking',
    'studio.consignArtwork.assetMetadata.field.moods.option.tragic': 'Tragic',
    'studio.consignArtwork.assetMetadata.field.moods.option.tense': 'Tense',
    'studio.consignArtwork.assetMetadata.field.moods.option.vibrant': 'Vibrant',
    'studio.consignArtwork.assetMetadata.field.moods.option.violent': 'Violent',
    'studio.consignArtwork.assetMetadata.field.moods.option.wonder': 'Wonder',
    'studio.consignArtwork.assetMetadata.field.moods.option.whimsical': 'Whimsical',

    // 'studio.consignArtwork.assetMetadata.field.date': 'Date',

    // 'studio.consignArtwork.assetMetadata.field.artistName': 'Artist Name',
    // 'studio.consignArtwork.assetMetadata.field.place': 'Place',

    // 'studio.consignArtwork.assetMetadata.field.objectType': 'Object Type',
    // 'studio.consignArtwork.assetMetadata.field.objectType.video': 'Video',
    // 'studio.consignArtwork.assetMetadata.field.objectType.2D': '2D',
    // 'studio.consignArtwork.assetMetadata.field.objectType.3D': '3D',
    // 'studio.consignArtwork.assetMetadata.field.objectType.phygital': 'Phygital',
    // 'studio.consignArtwork.assetMetadata.field.objectType.other': 'Other',

    // 'studio.consignArtwork.assetMetadata.field.category': 'Category',
    // 'studio.consignArtwork.assetMetadata.field.category.photography': 'Photography',
    // 'studio.consignArtwork.assetMetadata.field.category.painting': 'Painting',
    // 'studio.consignArtwork.assetMetadata.field.category.3D': '3D',
    // 'studio.consignArtwork.assetMetadata.field.category.video': 'Video',
    // 'studio.consignArtwork.assetMetadata.field.category.mixedMedia': 'Mixed Media',
    // 'studio.consignArtwork.assetMetadata.field.category.illustration': 'Illustration',
    // 'studio.consignArtwork.assetMetadata.field.category.collage': 'Collage',
    // 'studio.consignArtwork.assetMetadata.field.category.ai': 'AI',
    // 'studio.consignArtwork.assetMetadata.field.category.other': 'Other',

    // 'studio.consignArtwork.assetMetadata.field.medium': 'Medium',
    // 'studio.consignArtwork.assetMetadata.field.medium.oil': 'Oil',
    // 'studio.consignArtwork.assetMetadata.field.medium.watercolour': 'Watercolour',
    // 'studio.consignArtwork.assetMetadata.field.medium.acrylic': 'Acrylic',
    // 'studio.consignArtwork.assetMetadata.field.medium.ink': 'Ink',
    // 'studio.consignArtwork.assetMetadata.field.medium.illustration': 'Illustration',
    // 'studio.consignArtwork.assetMetadata.field.medium.collage': 'Collage',
    // 'studio.consignArtwork.assetMetadata.field.medium.AI': 'AI',
    // 'studio.consignArtwork.assetMetadata.field.medium.mixedMedia': 'Mixed media',
    // 'studio.consignArtwork.assetMetadata.field.medium.film': 'Film',
    // 'studio.consignArtwork.assetMetadata.field.medium.photography': 'Photography',
    // 'studio.consignArtwork.assetMetadata.field.medium.analogPhotography': 'Analog photography',
    // 'studio.consignArtwork.assetMetadata.field.medium.digitalPhotography': 'Digital photography',
    // 'studio.consignArtwork.assetMetadata.field.medium.compositePhotography': 'Composite Photography',
    // 'studio.consignArtwork.assetMetadata.field.medium.other': 'Other',
    // 'studio.consignArtwork.assetMetadata.field.tags': 'Tags',
    // 'studio.consignArtwork.assetMetadata.field.tags.button': 'Add',
    // 'studio.consignArtwork.assetMetadata.field.tags.placeholder': 'Add tag',

    'studio.consignArtwork.assetMetadata.field.errors': (data: { message: string }) =>
        `${data.message === 'required' || data.message === 'minItems' ? 'Field required' : ''}`,

    /* Licenses */

    'studio.consignArtwork.licenses.title': 'Licenses',
    'studio.consignArtwork.licenses.description':
        'Currently, Vitruveo offers four ways for your artwork to be licensed/sold. Here you can choose any of these licensing options:',
    'studio.consignArtwork.licenses.oneLicense.error': 'Please add at least one license',
    'studio.consignArtwork.licenses.fillFields.error': 'Fill in the fields correctly.',
    'studio.consignArtwork.licenses.alreadyAdded': 'License already added',
    'studio.consignArtwork.licenses.delete.button': 'Delete',
    'studio.consignArtwork.licenses.add.button': 'Add',

    'studio.consignArtwork.licenses.field.checkBoolean': (data: { checkBoolean: unknown }) =>
        `${data.checkBoolean === true ? 'yes' : data.checkBoolean === false ? 'no' : data.checkBoolean}`,
    'studio.consignArtwork.licenses.field.errors': (data: { message: string }) =>
        `${data.message === 'field required' ? 'field required' : ''}`,
    'studio.consignArtwork.licenses.field.stream': 'Stream v1.0',
    'studio.consignArtwork.licenses.field.print': 'Print v1.0',
    'studio.consignArtwork.licenses.field.NFT': 'NFT v1.0',
    'studio.consignArtwork.licenses.field.maximumUnits': 'Maximum Units',
    'studio.consignArtwork.licenses.field.unitPrice': 'Unit Price',
    'studio.consignArtwork.licenses.field.maximumEditions': 'Maximum Editions',
    'studio.consignArtwork.licenses.field.editionPrice': 'Edition Price',
    'studio.consignArtwork.licenses.field.elasticEditions': 'Elastic Editions',
    'studio.consignArtwork.licenses.license': 'License',

    'studio.consignArtwork.licenses.nft.description':
        'This license makes the artwork available for sale under one of several edition pricing models. When sold, an NFT of the artwork is minted and delivered to the buyer.',
    'studio.consignArtwork.licenses.nft.enable':
        'Enable this license if you want buyers to have ownership of a digital collectible of the artwork.',

    'studio.consignArtwork.licenses.nft.selectEdition.title': 'Select Edition',
    'studio.consignArtwork.licenses.nft.selectEdition.elasticEditions':
        'is a flexible model that gives a buyer the ability to combine multiple editions into one, dynamically changing the edition size.',
    'studio.consignArtwork.licenses.nft.selectEdition.singleEdition': 'is a fixed 1/1 model.',
    'studio.consignArtwork.licenses.nft.selectEdition.unlimitedEditions':
        'is a fee or free model for unlimited editions.',

    'studio.consignArtwork.licenses.nft.elasticEditions.title': 'Elastic Editions',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionPrice.title': 'Edition Price (USD)',
    'studio.consignArtwork.licenses.nft.elasticEditions.numberOfEditions.title': 'Number of Editions',
    'studio.consignArtwork.licenses.nft.elasticEditions.totalPrice.title': 'Total Price (USD)',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionDiscount.title': 'Edition Discount',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionPrice':
        '“Edition Price” is the price of the artwork in U.S. dollars.',
    'studio.consignArtwork.licenses.nft.elasticEditions.numberOfEditions':
        '“Number of Editions” is the quantity of editions of the artwork that can be minted.',
    'studio.consignArtwork.licenses.nft.elasticEditions.totalPrice':
        '“Total Price” is the “Edition Price” multiplied by “Number of Editions.”',
    'studio.consignArtwork.licenses.nft.elasticEditions.editionDiscount':
        '“Edition Discount” is the discount for the buyer when purchasing multiple editions. It is calculated by dividing 10 by the “Number of Editions.” If enabled, the discount is applied for each edition after the first one.',
    'studio.consignArtwork.licenses.nft.singleEdition.title': 'Single Edition',
    'studio.consignArtwork.licenses.nft.singleEdition.editionPrice':
        '“Edition Price” is the price of the artwork in U.S. dollars.',
    'studio.consignArtwork.licenses.nft.singleEdition.editionPrice.title': 'Edition Price (USD)',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.title': 'Unlimited Editions',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.editionPrice':
        '“Edition Price” is the price of the artwork in U.S. dollars.',
    'studio.consignArtwork.licenses.nft.unlimitedEditions.editionPrice.title': 'Edition Price (USD)',

    'studio.consignArtwork.licenses.stream.description':
        'This license makes the artwork available to curators for including in playlists for streaming art to digital frames. Earnings for streaming are automatically calculated based on usage and negotiated price agreements.',
    'studio.consignArtwork.licenses.stream.enable':
        'Enable this license if you want curators to include your artwork in playlists that are used by consumers and businesses for slideshows on digital frames.',
    'studio.consignArtwork.licenses.stream.enable.description':
        'Stream earnings are automatically calculated based on usage and negotiated price agreements.',
    'studio.consignArtwork.licenses.stream.unlimitedStreaming': 'Unlimited Streaming',
    'studio.consignArtwork.licenses.stream.unlimitedStreaming.description':
        'The artwork may be used for streaming in unlimited scenarios.',

    'studio.consignArtwork.licenses.print.description':
        'This license makes the artwork available to end-users for printing to a single physical item using Print-on-Demand (POD) technology. The license is freely transferable until the point of printing, after which it is transferable solely to the owner of the physical item.',
    'studio.consignArtwork.licenses.print.enable':
        'Enable this license if you want end-users to use your art for print-on-demand (POD) applications. This license is for individual printing; bulk printing is not permitted.',
    'studio.consignArtwork.licenses.print.singlePrint.title': 'Single Print',
    'studio.consignArtwork.licenses.print.singlePrint.description':
        '“Unit Price” is the price of the artwork in U.S. dollars for a single print.',
    'studio.consignArtwork.licenses.print.singlePrint.field': 'Unit Price (USD)',

    'studio.consignArtwork.licenses.remix.description':
        'This license makes the artwork available to end-users for use in Remix applications using the',
    'studio.consignArtwork.licenses.remix.description2':
        'license which allows remix usage for non-commercial purposes.',
    'studio.consignArtwork.licenses.remix.singleRemix.title': 'Single Remix',
    'studio.consignArtwork.licenses.remix.singleRemix.description':
        '“Unit Price” is the price of the artwork in U.S. dollars for a single remix.',
    'studio.consignArtwork.licenses.remix.singleRemix.field': 'Unit Price (USD)',
    'studio.consignArtwork.licenses.remix.enable':
        'Enable this license if you want end-users to use your art in Remix applications. The remix output may only be used for non-commercial purposes.',

    /* Terms of Use */
    'studio.consignArtwork.termsOfUse.title': 'Terms of Use',
    'studio.consignArtwork.termsOfUse.description': 'Complete all required tasks and consign your artwork',
    'studio.consignArtwork.termsOfUse.accept.button': (data: { contract: boolean; scrolledToBottom: boolean }) =>
        data.contract ? 'Accepted' : data.scrolledToBottom ? 'Accept Contract' : 'Scroll to the End',
    'studio.consignArtwork.termsOfUse.isOriginal':
        'I hereby agree that the Asset and Auxiliary Media files are original, authentic works that have been created by the creators indicated in the metadata submission and not copied, stolen, or plagiarized from any other source.',
    'studio.consignArtwork.termsOfUse.generatedArtworkAI':
        'I hereby agree that if any portion of the Asset and Auxiliary Media files were created using Artificial Intelligence, I have answered "Yes" in the Metadata field for "AI Generation."',
    'studio.consignArtwork.termsOfUse.notMintedOtherBlockchain':
        'I hereby agree that this work is not minted on any other blockchain, offered, consigned, or listed for sale on any other platform, and will not be minted, offered, consigned, or listed as long as the listing is active on this platform.',

    /* Auxiliary Media */
    'studio.consignArtwork.auxiliaryMedia.description':
        'Upload auxiliary media assets for Behind-the-scenes (BTS) and Augmented Reality (AR).',
    'studio.consignArtwork.auxiliaryMedia.title': 'Auxiliary Media',
    'studio.consignArtwork.auxiliaryMedia.subTitle': 'Auxiliary Media Assets',
    'studio.consignArtwork.auxiliaryMedia.arImage.title': 'AR Image',
    'studio.consignArtwork.auxiliaryMedia.arVideo.title': 'AR Video',
    'studio.consignArtwork.auxiliaryMedia.btsImage.title': 'BTS Image',
    'studio.consignArtwork.auxiliaryMedia.btsVideo.title': 'BTS Video',
    'studio.consignArtwork.auxiliaryMedia.codeZip.title': 'Code Zip',

    /* Consignment Status */
    'studio.consignArtwork.consignmentStatus.title': 'Consignment Status',
    'studio.consignArtwork.consignmentStatus.description': 'Nice work! Your artwork is ready for consignment.',
    'studio.consignArtwork.consignmentStatus.message': 'This feature will be available soon.',
    'studio.consignArtwork.consignmentStatus.yes': 'Yes',
    'studio.consignArtwork.consignmentStatus.no': 'No',
    'studio.consignArtwork.consignmentStatus.edit': 'Edit',
    'studio.consignArtwork.consignmentStatus.view': 'View',
    'studio.consignArtwork.consignmentStatus.search': 'Search',
    'studio.consignArtwork.consignmentStatus.license': 'License',

    'studio.consignArtwork.consignmentStatus.draft.title': 'Draft',
    'studio.consignArtwork.consignmentStatus.preview.title': 'Preview',
    'studio.consignArtwork.consignmentStatus.activate.title': 'Activate',

    'studio.consignArtwork.consignmentStatus.activation.title': 'Activation',
    'studio.consignArtwork.consignmentStatus.activation.description':
        'Activation consigns your artwork to the blockchain and requires a Creator Credit.',
    'studio.consignArtwork.consignmentStatus.creatorCreditsRequired': 'Creator Credits Required',
    'studio.consignArtwork.consignmentStatus.creatorCreditsAvailable': 'Creator Credits Available',
    'studio.consignArtwork.consignmentStatus.viewArtwork.button': 'View Artwork',

    /* BackModalConfirm */
    'studio.consignArtwork.backModal.title': 'Would you like to save the information?',
    'studio.consignArtwork.backModal.confirm.button': 'Save',
    'studio.consignArtwork.backModal.cancel.button': 'No',

    /* Sidebar */
    'studio.sidebar.consign': 'Consign Artwork',
    'studio.sidebar.applications': 'Applications',

    /* Footer */
    'studio.footer.thisStep': 'This step is',
    'studio.footer.completed': 'Completed',
    'studio.footer.inProgress': 'In Progress',
    'studio.footer.notYet': 'and is not yet complete',
    'studio.footer.step': 'Step',
    'studio.footer.of': 'of',
    'studio.footer.save': 'Save',
    'studio.footer.back': 'Back',
};

export default language;
