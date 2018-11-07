import Package from "./package";
import { Tree } from "broccoli-plugin";

// The Workspace represents our directory that will contain a complete Vanilla
// Ember app. It's weird for a broccoli plugin, because we have strong opinions
// about symlinks that don't match Broccoli's. So instead of writing to our own
// assigned (temporary) output directory, we maintain our own final destination
// directory.
//
// It's still important that we particpate in the Brococli dependency graph.
// That is, later stages that depend on us must still include us as an input
// tree, even though they won't actually read from our outputDir as broccoli
// understands it.
//
// Our own broccoli build step is responsible only for assembling the proper
// node_modules structure with all our dependencies in v2 format. It leaves an
// empty place for the app's own code to go, which is filled in later via
// copyIntoApp().
export default interface Workspace extends Tree {
  clearApp(): void;
  copyIntoApp(srcPath: string): void;

  // This package represents the on-disk package as authored, not a thing
  // _inside_ the workspace. The workspace isn't responsible for building app
  // code.
  readonly appSource: Package;

  // This is the place inside the workspace that the app's own built form will
  // go.
  readonly appDestDir: string;
}