<?php

namespace App\Traits;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;

trait Addressable {

    private function seedDatabaseFields(array $data): array {
        $position = [
            'lng' => $this->faker->longitude,
            'lat' => $this->faker->latitude,
        ];

        return [
            ...$data,
            'address' => $this->faker->streetAddress,
            'city' => $this->faker->cityPrefix,
            'state' => $this->faker->state,
            'zipcode' => $this->faker->postcode,
            'position' => DB::raw("POINT({$position['lng']}, {$position['lat']})"),
            'longitude' => $position['lng'],
            'latitude' => $position['lat'],
        ];
    }

    private function buildDatabaseFields(Blueprint $table): Blueprint {
        $table->string('address')->nullable();
        $table->string('secondary_address')->nullable();
        $table->string('city')->nullable();
        $table->string('state')->nullable();
        $table->string('zipcode')->nullable();

        $table->point('position')->nullable();
        $table->string('longitude')->nullable();
        $table->string('latitude')->nullable();

        return $table;
    }
}