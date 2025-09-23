export type StackRoutes = {
  Profile: undefined;
  Thoughts: undefined;
  CreateJournal: undefined;
  PhobiaExposures: undefined;
  CreatePhobiaExposure: undefined;
  EditPhobiaExposure: { data: { id: number; title: string; date: string } };
};
