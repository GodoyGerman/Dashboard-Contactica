<?php
/**
 * Plugin Name: Dashboard Usuarios Endpoint
 * Description: Plugin ligero que registra un endpoint REST para exponer/consumir usuarios desde la API externa del proyecto "dashboard-usuarios".
 * Version: 1.0.0
 * Author: (Germán Godoy)
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
}

add_action('rest_api_init', function () {
    register_rest_route('dashboard-usuarios/v1', '/users', array(
        'methods'  => 'GET',
        'callback' => 'du_get_users_proxy',
        'permission_callback' => '__return_true'
    ));
});

function du_get_users_proxy( $request ) {
    // URL del backend - se puede cambiar según despliegue
    $backend = defined('DU_BACKEND_URL') ? DU_BACKEND_URL : 'http://localhost:3001/api/users';

    $response = wp_remote_get( $backend );
    if ( is_wp_error( $response ) ) {
        return new WP_Error( 'backend_error', 'Error contacting backend', array( 'status' => 500 ) );
    }

    $code = wp_remote_retrieve_response_code( $response );
    $body = wp_remote_retrieve_body( $response );

    return rest_ensure_response( json_decode( $body, true ) );
}

// Opcional: define DU_BACKEND_URL en wp-config.php para apuntar a otra URL
?>
