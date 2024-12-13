import {supabase} from './connect';

interface ReadItemsOptions<T> {
  table: string;
  queryOptions?: Partial<T>;
  limit?: number;
  offset?: number;
}

interface CreateItemOptions<T> {
  table: string;
  data: T;
}

interface UpdateItemOptions<T> {
  table: string;
  id: string | number;
  updatedData: Partial<T>;
}

interface DeleteItemOptions {
  table: string;
  id: string | number;
}

// Create an item
export const createItem = async <T extends Record<string, unknown>>({
  table,
  data,
}: CreateItemOptions<T>): Promise<T[]> => {
  const {data: responseData, error} = await supabase.from(table).insert([data]);

  if (error) {
    throw error;
  }
  return responseData ?? [];
};

// Read items with pagination
export const readItems = async <T extends Record<string, unknown>>({
  table,
  queryOptions = {},
  limit = 10,
  offset = 0,
}: ReadItemsOptions<T>): Promise<T[]> => {
  const {data, error} = await supabase
    .from(table)
    .select('*')
    .match(queryOptions)
    .limit(limit)
    .range(offset, offset + limit - 1);

  if (error) {
    throw error;
  }
  return data ?? [];
};

// Update an item
export const updateItem = async <T extends Record<string, unknown>>({
  table,
  id,
  updatedData,
}: UpdateItemOptions<T>): Promise<T[]> => {
  const {data, error} = await supabase
    .from(table)
    .update(updatedData)
    .eq('id', id);

  if (error) {
    throw error;
  }
  return data ?? [];
};

// Delete an item
export const deleteItem = async <T extends Record<string, unknown>>({
  table,
  id,
}: DeleteItemOptions): Promise<T[]> => {
  const {data, error} = await supabase.from(table).delete().eq('id', id);

  if (error) {
    throw error;
  }
  return data ?? [];
};
