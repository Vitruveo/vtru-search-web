interface Values {
	context: Context;
	creators: Creators;
	provenance: Provenance;
	taxonomy: Taxonomy;
}

export interface ContextItem {
	title: keyof Context;
	type: string;
	values: Values;
	hidden: boolean;
	options: string[];
	onChange: (value: any) => void;
	onRemove: (color: string) => void;
}

interface Context {
	colors: string[];
	copyright: string;
	culture: string[];
	description: string;
	mood: string[];
	orientation: string[];
	title: string;
}

export interface CreatorsItem {
	title: keyof Creators;
	type: string;
	values: Values;
	hidden: boolean;
	options: string[];
	onChange: (value: any) => void;
	onRemove: (color: string) => void;
}

interface Creators {
	bio: string;
	ethnicity: string[];
	gender: string[];
	name: string;
	nationality: string[];
	profileUrl: string;
	residence: string[];
	roles: string;
}

interface Provenance {
	awards: {
		awardName: string;
		awardUrl: string;
	};
	blockchain: string[];
	country: string[];
	exhibitions: {
		exhibitionName: string;
		exhibitionUrl: string;
	};
	plusCode: string;
}

export interface TaxonomyItem {
	context: keyof Values;
	title: keyof Taxonomy;
	type: string;
	values: Values;
	tags: Tag[];
	hidden: boolean;
	options: string[];
	onChange: (value: any) => void;
	onRemove: (color: string) => void;
}

interface Taxonomy {
	aiGeneration: string[];
	arenabled: string[];
	category: string[];
	collections: string;
	medium: string[];
	nudity: string[];
	objectType: string[];
	style: string[];
	subject: string;
	tags: string[];
}

interface Tag {
	tag: string;
	count: number;
}

export interface Option {
	value: string;
	label: Element | JSX.Element | string;
}

export interface InputSelect {
	value: Option[];
    options: Option[];
    onChange(option: any): void;
}