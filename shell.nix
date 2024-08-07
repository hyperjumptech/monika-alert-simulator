let
  pkgs = import <nixpkgs> {};
in
  pkgs.mkShell {
    packages = [
      # Required packages
      pkgs.git
      pkgs.nodejs

      # Optional packages
      pkgs.docker
      pkgs.docker-compose
    ];
  }
