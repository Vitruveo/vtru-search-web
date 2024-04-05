export interface AssetsMetadata {
    context: Context;
    taxonomy: Taxonomy;
    creators: Creators;
    provenance: Provenance;
}
export interface Context {
    formData: FormData;
    schema: Schema;
    uiSchema: UiSchema;
}
export interface FormData {
    colors?: string[] | null;
    title?: string;
    description?: string;
}
export interface Schema {
    type: string;
    required?: string[] | null;
    properties: Properties;
}
export interface Properties {
    title: ItemsOrTitleOrCopyrightOrNameOrExhibitionNameOrAwardNameOrPlusCode;
    description: DescriptionOrBioOrProfileUrlOrExhibitionUrlOrAwardUrl;
    culture: ItemsOrCultureOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrEthnicityOrGenderOrBlockchain;
    mood: MoodOrMediumOrStyle;
    colors: ColorsOrTagsOrCollectionsOrSubjectOrRoles;
    copyright: ItemsOrTitleOrCopyrightOrNameOrExhibitionNameOrAwardNameOrPlusCode;
    orientation: ItemsOrCultureOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrEthnicityOrGenderOrBlockchain;
}
export interface ItemsOrTitleOrCopyrightOrNameOrExhibitionNameOrAwardNameOrPlusCode {
    type: string;
}
export interface DescriptionOrBioOrProfileUrlOrExhibitionUrlOrAwardUrl {
    type: string;
    format: string;
}
export interface ItemsOrCultureOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrEthnicityOrGenderOrBlockchain {
    type: string;
    enum?: string[] | null;
}
export interface MoodOrMediumOrStyle {
    type: string;
    minItems: number;
    uniqueItems: boolean;
    items: ItemsOrCultureOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrEthnicityOrGenderOrBlockchain;
}
export interface ColorsOrTagsOrCollectionsOrSubjectOrRoles {
    type: string;
    item: string;
    minItems: number;
    maxItems: number;
    items: ItemsOrTitleOrCopyrightOrNameOrExhibitionNameOrAwardNameOrPlusCode;
}
export interface UiSchema {
    title: TitleOrDescriptionOrCopyrightOrNameOrBioOrProfileUrlOrNationalityOrResidenceOrEthnicityOrGenderOrCountryOrPlusCodeOrBlockchain;
    description: TitleOrDescriptionOrCopyrightOrNameOrBioOrProfileUrlOrNationalityOrResidenceOrEthnicityOrGenderOrCountryOrPlusCodeOrBlockchain;
    culture: CultureOrMoodOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrMediumOrStyle;
    mood: CultureOrMoodOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrMediumOrStyle;
    colors: Colors;
    copyright: TitleOrDescriptionOrCopyrightOrNameOrBioOrProfileUrlOrNationalityOrResidenceOrEthnicityOrGenderOrCountryOrPlusCodeOrBlockchain;
    orientation: CultureOrMoodOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrMediumOrStyle;
}
export interface TitleOrDescriptionOrCopyrightOrNameOrBioOrProfileUrlOrNationalityOrResidenceOrEthnicityOrGenderOrCountryOrPlusCodeOrBlockchain {
    ['ui:widget']: string;
    ['ui:options']: Uioptions;
}
export interface Uioptions {
    label: boolean;
    placeholder: string;
}
export interface CultureOrMoodOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrMediumOrStyle {
    ['ui:widget']: string;
    classNames: string;
}
export interface Colors {
    ['ui:widget']: string;
    items: Items;
    ['ui:options']: Uioptions1;
}
export interface Items {
    ['ui:options']: Uioptions2;
}
export interface Uioptions2 {
    label: boolean;
}
export interface Uioptions1 {
    label: boolean;
    orderable: boolean;
}
export interface Taxonomy {
    formData: FormData1;
    schema: Schema1;
    uiSchema: UiSchema1;
}
export interface FormData1 {
    subject?: string[] | null;
    tags?: string[] | null;
}
export interface Schema1 {
    type: string;
    required?: string[] | null;
    properties: Properties1;
}
export interface Properties1 {
    objectType: ItemsOrCultureOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrEthnicityOrGenderOrBlockchain;
    tags: ColorsOrTagsOrCollectionsOrSubjectOrRoles;
    collections: ColorsOrTagsOrCollectionsOrSubjectOrRoles;
    aiGeneration: ItemsOrCultureOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrEthnicityOrGenderOrBlockchain;
    arenabled: ItemsOrCultureOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrEthnicityOrGenderOrBlockchain;
    nudity: ItemsOrCultureOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrEthnicityOrGenderOrBlockchain;
    category: ItemsOrCultureOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrEthnicityOrGenderOrBlockchain;
    medium: MoodOrMediumOrStyle;
    style: MoodOrMediumOrStyle;
    subject: ColorsOrTagsOrCollectionsOrSubjectOrRoles;
}
export interface UiSchema1 {
    objectType: CultureOrMoodOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrMediumOrStyle;
    tags: TagsOrCollectionsOrSubject;
    collections: TagsOrCollectionsOrSubject;
    aiGeneration: CultureOrMoodOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrMediumOrStyle;
    arenabled: CultureOrMoodOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrMediumOrStyle;
    nudity: CultureOrMoodOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrMediumOrStyle;
    category: CultureOrMoodOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrMediumOrStyle;
    medium: CultureOrMoodOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrMediumOrStyle;
    style: CultureOrMoodOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrMediumOrStyle;
    subject: TagsOrCollectionsOrSubject;
}
export interface TagsOrCollectionsOrSubject {
    ['ui:widget']: string;
    items: Items1;
    ['ui:options']: Uioptions1;
}
export interface Items1 {
    ['ui:emptyValue']: string;
    ['ui:options']: Uioptions2;
}
export interface Creators {
    formData?: FormDataEntity[] | null;
    schema: Schema2;
    uiSchema: UiSchema2;
}
export interface FormDataEntity {
    name: string;
}
export interface Schema2 {
    type: string;
    items: Items2;
}
export interface Items2 {
    type: string;
    required?: string[] | null;
    properties: Properties2;
}
export interface Properties2 {
    name: ItemsOrTitleOrCopyrightOrNameOrExhibitionNameOrAwardNameOrPlusCode;
    roles: ColorsOrTagsOrCollectionsOrSubjectOrRoles;
    bio: DescriptionOrBioOrProfileUrlOrExhibitionUrlOrAwardUrl;
    profileUrl: DescriptionOrBioOrProfileUrlOrExhibitionUrlOrAwardUrl;
    nationality: NationalityOrResidenceOrCountry;
    residence: NationalityOrResidenceOrCountry;
    ethnicity: ItemsOrCultureOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrEthnicityOrGenderOrBlockchain;
    gender: ItemsOrCultureOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrEthnicityOrGenderOrBlockchain;
}
export interface NationalityOrResidenceOrCountry {
    type: string;
    enum?: string[] | null;
    enumNames?: string[] | null;
}
export interface UiSchema2 {
    ['ui:options']: Uioptions3;
    items: Items3;
}
export interface Uioptions3 {
    orderable: boolean;
}
export interface Items3 {
    classNames: string;
    name: TitleOrDescriptionOrCopyrightOrNameOrBioOrProfileUrlOrNationalityOrResidenceOrEthnicityOrGenderOrCountryOrPlusCodeOrBlockchain;
    roles: Roles;
    bio: TitleOrDescriptionOrCopyrightOrNameOrBioOrProfileUrlOrNationalityOrResidenceOrEthnicityOrGenderOrCountryOrPlusCodeOrBlockchain;
    profileUrl: TitleOrDescriptionOrCopyrightOrNameOrBioOrProfileUrlOrNationalityOrResidenceOrEthnicityOrGenderOrCountryOrPlusCodeOrBlockchain;
    nationality: TitleOrDescriptionOrCopyrightOrNameOrBioOrProfileUrlOrNationalityOrResidenceOrEthnicityOrGenderOrCountryOrPlusCodeOrBlockchain;
    residence: TitleOrDescriptionOrCopyrightOrNameOrBioOrProfileUrlOrNationalityOrResidenceOrEthnicityOrGenderOrCountryOrPlusCodeOrBlockchain;
    ethnicity: TitleOrDescriptionOrCopyrightOrNameOrBioOrProfileUrlOrNationalityOrResidenceOrEthnicityOrGenderOrCountryOrPlusCodeOrBlockchain;
    gender: TitleOrDescriptionOrCopyrightOrNameOrBioOrProfileUrlOrNationalityOrResidenceOrEthnicityOrGenderOrCountryOrPlusCodeOrBlockchain;
}
export interface Roles {
    ['ui:widget']: string;
    items: Items4;
    ['ui:options']: Uioptions1;
}
export interface Items4 {
    classNames: string;
    ['ui:emptyValue']: string;
    ['ui:options']: Uioptions2;
}
export interface Provenance {
    formData: FormData2;
    schema: Schema3;
    uiSchema: UiSchema3;
}
export interface FormData2 {
    awards?: null[] | null;
    exhibitions?: null[] | null;
    blockchain: string;
}
export interface Schema3 {
    type: string;
    required?: string[] | null;
    properties: Properties3;
}
export interface Properties3 {
    country: NationalityOrResidenceOrCountry;
    plusCode: ItemsOrTitleOrCopyrightOrNameOrExhibitionNameOrAwardNameOrPlusCode;
    blockchain: ItemsOrCultureOrOrientationOrObjectTypeOrAiGenerationOrArenabledOrNudityOrCategoryOrEthnicityOrGenderOrBlockchain;
    exhibitions: Exhibitions;
    awards: Awards;
}
export interface Exhibitions {
    type: string;
    item: string;
    minItems: number;
    maxItems: number;
    items: Items5;
}
export interface Items5 {
    type: string;
    required?: string[] | null;
    properties: Properties4;
}
export interface Properties4 {
    exhibitionName: ItemsOrTitleOrCopyrightOrNameOrExhibitionNameOrAwardNameOrPlusCode;
    exhibitionUrl: DescriptionOrBioOrProfileUrlOrExhibitionUrlOrAwardUrl;
}
export interface Awards {
    type: string;
    item: string;
    minItems: number;
    maxItems: number;
    items: Items6;
}
export interface Items6 {
    type: string;
    required?: string[] | null;
    properties: Properties5;
}
export interface Properties5 {
    awardName: ItemsOrTitleOrCopyrightOrNameOrExhibitionNameOrAwardNameOrPlusCode;
    awardUrl: DescriptionOrBioOrProfileUrlOrExhibitionUrlOrAwardUrl;
}
export interface UiSchema3 {
    country: TitleOrDescriptionOrCopyrightOrNameOrBioOrProfileUrlOrNationalityOrResidenceOrEthnicityOrGenderOrCountryOrPlusCodeOrBlockchain;
    plusCode: TitleOrDescriptionOrCopyrightOrNameOrBioOrProfileUrlOrNationalityOrResidenceOrEthnicityOrGenderOrCountryOrPlusCodeOrBlockchain;
    blockchain: TitleOrDescriptionOrCopyrightOrNameOrBioOrProfileUrlOrNationalityOrResidenceOrEthnicityOrGenderOrCountryOrPlusCodeOrBlockchain;
    exhibitions: Exhibitions1;
    awards: Awards1;
}
export interface Exhibitions1 {
    ['ui:widget']: string;
    ['ui:options']: Uioptions3;
    items: Items7;
}
export interface Items7 {
    exhibitionName: ExhibitionNameOrExhibitionUrlOrAwardNameOrAwardUrl;
    exhibitionUrl: ExhibitionNameOrExhibitionUrlOrAwardNameOrAwardUrl;
}
export interface ExhibitionNameOrExhibitionUrlOrAwardNameOrAwardUrl {
    ['ui:options']: Uioptions;
}
export interface Awards1 {
    ['ui:widget']: string;
    items: Items8;
    ['ui:options']: Uioptions1;
}
export interface Items8 {
    awardName: ExhibitionNameOrExhibitionUrlOrAwardNameOrAwardUrl;
    awardUrl: ExhibitionNameOrExhibitionUrlOrAwardNameOrAwardUrl;
}
