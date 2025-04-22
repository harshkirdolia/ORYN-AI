let
  pkgs = import <nixpkgs> {};
in

  pkgs.mkShell {
    buildInputs = [
      pkgs.mailutils,
      pkgs.try,
      pkgs.nano
    ];
  }