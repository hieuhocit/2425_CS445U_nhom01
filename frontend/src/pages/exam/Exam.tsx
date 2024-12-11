/** react-redux */
import { useSelector } from 'react-redux';
import { themeMode } from '@/store/theme/themeSelector';
import { currentLicenseSelector } from '@/store/setting/settingSelector';

/** react-router */
import {
  LoaderFunctionArgs,
  useLoaderData,
  useParams,
  useRouteLoaderData,
} from 'react-router-dom';

/** Template */
import TemplateTestPage from '../template-test/TemplateTest';

/** API */
import { getQuestions } from '@/services/questionApi';

/** types */
import { IExam, IQuestion } from '@/types/definitions';

export async function loader({
  params,
}: LoaderFunctionArgs): Promise<IQuestion[] | null> {
  const { examId } = params;
  const res = await getQuestions(undefined, undefined, examId);
  return res?.data?.questions as IQuestion[] | null;
}

export default function ExamPage() {
  const questions = useLoaderData() as IQuestion[] | undefined;
  const mode = useSelector(themeMode);

  const { exams } = useRouteLoaderData('root') as {
    exams: IExam[] | undefined;
  };

  const currentLicense = useSelector(currentLicenseSelector);

  const { examId } = useParams();

  const isDarkMode = mode === 'dark';

  const title = exams?.find((e) => e.id === Number(examId))?.title as string;

  return (
    <>
      {exams && (
        <TemplateTestPage
          isDark={isDarkMode}
          behavior='exam'
          questionsData={questions}
          timer={Number(currentLicense?.timer)}
          title={Number(title) ? `Đề số ${title}` : title}
        />
      )}
    </>
  );
}
