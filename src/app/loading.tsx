import Loader from '@/components/loader';
import { getTranslations } from 'next-intl/server';

const Loading = async () => {
	const t = await getTranslations("general");
	return (
		<div className="w-full min-h-screen flex items-center">
			<div className="flex flex-col items-center space-y-4 mx-auto">
				<Loader />

				<span className="text-neutral-700">{t("loading")}</span>
			</div>
		</div>
	);
}

export default Loading;