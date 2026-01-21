export type Project = {
  id: number;
  name: string;
  tenant_id: number;
  status: 'active' | 'archived';
};
