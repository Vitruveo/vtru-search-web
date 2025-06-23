interface DescriptionProps {
    description: string;
}

export function Description({ description }: DescriptionProps) {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="max-w-full text-center overflow-hidden text-ellipsis line-clamp-4">{description}</h2>
        </div>
    );
}
