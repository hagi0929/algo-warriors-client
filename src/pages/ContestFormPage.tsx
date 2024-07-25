import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getProblems } from "../hooks/useProblems";

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
  const { data: problems, error, isLoading } = getProblems();

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error loading results: {error.message}</div>;
  const problemsArray = Array.isArray(problems) ? problems : [];

  const onSubmit = async (data: ContestFormInputs) => {
    
    try {
      const response = await fetch('http://127.0.0.1:3000/contest/contests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          start_time: data.startTime,
          end_time: data.endTime,
          created_by: 1
    
        })
      });

      if (!response.ok) {
        console.error('Creating contest failed:', response.statusText);
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error(`Expected application/json but received ${contentType}`);
      }

      const res = await response.json();
      console.log('res:', res);
      var new_contest_id = res.contest_id;
      const bodyData = data.problems.map(id => ({
        contest_id: new_contest_id,
        problem_id: id
      }));
      
      const response2 = await fetch('http://127.0.0.1:3000/contest/contests/add-problems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
      });

      if (!response2.ok) {
        console.error('Fetch submission failed:', response2.statusText);
        throw new Error(`Network response was not ok: ${response2.statusText}`);
      }

      const contentType2 = response2.headers.get('content-type');
      if (!contentType2 || !contentType2.includes('application/json')) {
        throw new Error(`Expected application/json but received ${contentType2}`);
      }

      const res2 = await response2.json();
      console.log('res:', res2);

    } catch (error) {
      console.error('Creating contest failed', error);
    }
    
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
