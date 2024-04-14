import { useQuery, gql } from '@apollo/client';

const GET_TASKS = gql`
  query getAllTask($sortBy: SortInput, $filterBy: FilterInput) {
    getAllTask(sortBy: $sortBy, filterBy: $filterBy) {
      id
      taskname
      taskdescription
      priority
      duedate
    }
  }
`;

interface SortInput {
  field: string;
  order: string;
}

interface FilterInput {
  priority: string;
}

// Set default parameters as undefined or any default values you prefer
export const useTasks = (sort: SortInput | null = null, filter: FilterInput | null = null) => {
  let token: string | null = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  const { loading, error, data, refetch } = useQuery(GET_TASKS, {
    variables: { sortBy: sort, filterBy: filter },
    fetchPolicy: "cache-and-network",
    context: {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  });

  return {
    loading,
    error,
    tasks: data ? data.getAllTask : [],
    refetch,
  };
};
