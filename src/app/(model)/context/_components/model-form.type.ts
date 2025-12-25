export type Region = {
  province: string;
  district: string;
  neighborhoods?: string[];
};

export type ModelFormValues = {
  region: Region;
  companion?: string[] | null;
  address?: string | null;
  budget: string;
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
};
