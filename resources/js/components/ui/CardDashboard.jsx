export default function CardDashboard({ title, info, Icon }) {
    return (
        <div className="flex-1 p-4 bg-primary text-background border-l-4 border-secondary rounded-xl flex gap-4 items-center justify-between">
            <div>
                <p className="font-semibold text-lg">{title}</p>
                <p>{info}</p>
            </div>
            {Icon && <Icon size={40}/>}
        </div>
    )
}