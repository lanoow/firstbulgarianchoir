
interface DashboardHeaderProps {
	title: string;
	subtitle?: string;
	actions?: React.ReactNode;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle, actions }) => {
	return (
		<div className="flex flex-col md:flex-row gap-4 md:justify-between items-center my-2">
			<div className="flex flex-col gap-1">
				<h1 className="text-2xl font-medium">{title}</h1>
				{subtitle && <p className="text-gray-500 max-w-2xl">{subtitle}</p>}
			</div>

			{actions && <div>{actions}</div>}
		</div>
	)
}

export default DashboardHeader;