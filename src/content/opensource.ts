export type OSSContribution = {
  repo: string;
  repoUrl: string;
  pr: string;
  prUrl: string;
  title: string;
  impact: string;
  status: "merged" | "open";
};

/** Merged upstream PRs — strongest SDE proof. Newest / most technical first. */
export const ossContributions: OSSContribution[] = [
  {
    repo: "libredb/libredb-studio",
    repoUrl: "https://github.com/libredb/libredb-studio",
    pr: "#989",
    prUrl: "https://github.com/libredb/libredb-studio/pull/989",
    title: "Disclose that the Admin Audit tab omits proxy-recorded denials",
    impact: "Audit-integrity fix — closes a honesty gap in a security surface.",
    status: "merged",
  },
  {
    repo: "xevrion/breakscale",
    repoUrl: "https://github.com/xevrion/breakscale",
    pr: "#56",
    prUrl: "https://github.com/xevrion/breakscale/pull/56",
    title: "Load balancer admits through its pool instead of passing everything",
    impact: "Correctness fix in admission control / load-balancing path.",
    status: "merged",
  },
  {
    repo: "xevrion/breakscale",
    repoUrl: "https://github.com/xevrion/breakscale",
    pr: "#71",
    prUrl: "https://github.com/xevrion/breakscale/pull/71",
    title: "Suggest one fix for a component that cannot keep up",
    impact: "Backpressure-aware suggestion for an overloaded component.",
    status: "merged",
  },
  {
    repo: "ConvoBrains/zero-cost-crm",
    repoUrl: "https://github.com/ConvoBrains/zero-cost-crm",
    pr: "#89",
    prUrl: "https://github.com/ConvoBrains/zero-cost-crm/pull/89",
    title: "Settings UI editor for championStatusToStage mapping",
    impact: "Product settings UI — mapping editor shippers can use directly.",
    status: "merged",
  },
  {
    repo: "navyabijoy/invisible-notes",
    repoUrl: "https://github.com/navyabijoy/invisible-notes",
    pr: "#27",
    prUrl: "https://github.com/navyabijoy/invisible-notes/pull/27",
    title: "Keep toolbar controls visible at default width",
    impact: "Layout/overflow fix for the default editor width.",
    status: "merged",
  },
  {
    repo: "navyabijoy/invisible-notes",
    repoUrl: "https://github.com/navyabijoy/invisible-notes",
    pr: "#11",
    prUrl: "https://github.com/navyabijoy/invisible-notes/pull/11",
    title: "Add monospace font toggle to note toolbar",
    impact: "Small editor UX addition, shipped with toggle.",
    status: "merged",
  },
];
