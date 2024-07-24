import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useProblems } from "../hooks/useProblems";

interface ContestFormInputs {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  problems: string[]; // Array of selected problem IDs
}

const ContestFormPage: React.FC = () => {
  const { control, handleSubmit, formState: { errors }, setValue, getValues } = useForm<ContestFormInputs>({
    defaultValues: {
      problems: []
    }
  });
  const navigate = useNavigate();
  const { data: problems, error, isLoading } = useProblems();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading results: {error.message}</div>;
  const problemsArray = Array.isArray(problems) ? problems : [];

  const onSubmit = (data: ContestFormInputs) => {
    console.log(data);
    navigate('/home');
  };

  return (
    <>
      <Navbar />
      <div className="font-sm h-screen w-screen pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full px-4">
          <div className="w-full">
            <label htmlFor="title">Title</label>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{ required: 'Title is required' }}
              render={({ field }) => <input {...field} id="title" placeholder="Title" className="input w-full" />}
            />
            {errors.title && <p className="error-message text-red-500">{errors.title.message}</p>}
          </div>

          <div className="w-full">
            <label htmlFor="description">Description</label>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: 'Description is required' }}
              render={({ field }) => <textarea {...field} id="description" placeholder="Description" className="input w-full" />}
            />
            {errors.description && <p className="error-message text-red-500">{errors.description.message}</p>}
          </div>

          <div className="dates flex">
            <div className="w-1/2 pr-1">
              <label htmlFor="startTime">Start</label>
              <Controller
                name="startTime"
                control={control}
                defaultValue=""
                rules={{ required: 'Start Time is required' }}
                render={({ field }) => <input {...field} type="datetime-local" id="startTime" className="input w-full" />}
              />
              {errors.startTime && <p className="error-message text-red-500">{errors.startTime.message}</p>}
            </div>

            <div className="w-1/2">
              <label htmlFor="endTime">End</label>
              <Controller
                name="endTime"
                control={control}
                defaultValue=""
                rules={{ required: 'End Time is required' }}
                render={({ field }) => <input {...field} type="datetime-local" id="endTime" className="input w-full" />}
              />
              {errors.endTime && <p className="error-message text-red-500">{errors.endTime.message}</p>}
            </div>
          </div>

          <div className="w-full">
            <label className='text-lg pb-5'>Include Contest Problems</label>
            <div className="problems h-64 overflow-y-auto">
            {problemsArray.map((problem) => (
                <div key={problem.id} className="flex items-center">
                <Controller
                    name="problems"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                    <input
                        type="checkbox"
                        value={problem.id}
                        checked={getValues("problems").includes(String(problem.id))}
                        onChange={(e) => {
                        const selectedProblems = getValues("problems");
                        if (e.target.checked) {
                            setValue("problems", [...selectedProblems, e.target.value]);
                        } else {
                            setValue("problems", selectedProblems.filter(id => id !== e.target.value));
                        }
                        }}
                        className="mr-2"
                    />
                    )}
                />
                {problem.title}
                </div>
            ))}
            </div>
            {errors.problems && <p className="error-message text-red-500">{errors.problems.message}</p>}
            </div>

          <button type="submit" className="button w-full bg-slate-500 text-white py-2 rounded-md">Create Contest</button>
        </form>
      </div>
    </>
  );
};

export default ContestFormPage;
